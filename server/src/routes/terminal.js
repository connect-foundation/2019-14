const debug = require("debug")("routes:terminal");
const express = require("express");
const { DockerApi } = require("../api/Docker");
const { StreamResolver } = require("../utils/StreamResolver");

const router = express.Router();

const deleteDockerPrefix = (rawString) => {
  return rawString.slice(8);
};

const deleteLineFeeding = (rawString) => {
  if (rawString[rawString.length - 1] === "\n") {
    return rawString.slice(0, -1);
  }
  return rawString;
};

const resolveDockerStream = async (stream) => {
  const resolver = new StreamResolver(stream);
  let rawString = await resolver.flush();
  rawString = deleteDockerPrefix(rawString);
  rawString = deleteLineFeeding(rawString);
  return rawString;
};

router.post("/command/not-pending", async (req, res) => {
  const { containerName, cmd, options } = req.body;

  const dockerClient = new DockerApi(options);
  await dockerClient.init();

  const resultStream = await dockerClient.execByName(containerName, cmd);
  const cmdResult = resolveDockerStream(resultStream);

  debug(
    `containerName: ${containerName}`,
    `command: ${cmd}`,
    `options: ${options}`,
    `result: ${cmdResult}`
  );

  res.status(200).send(cmdResult);
});

module.exports = router;

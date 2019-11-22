const debug = require("debug")("boostwriter:routes:terminal");
const express = require("express");
const { DockerApi } = require("../api/docker");
const { StreamResolver } = require("../utils/stream-resolver");
const { utils } = require("../utils");

const { wrapAsync } = utils;

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

const dockerOptions = {
  host: process.env.REMOTE_DOCKER_IP,
  port: process.env.REMOTE_DOCKER_PORT,
  caPath: process.env.SSL_CA_PATH,
  certPath: process.env.SSL_CERT_PATH,
  keyPath: process.env.SSL_KEY_PATH,
};

const dockerClient = new DockerApi(dockerOptions);

router.post(
  "/command/not-pending",
  wrapAsync(async (req, res) => {
    const { containerName, cmd, options } = req.body;

    await dockerClient.init();

    const resultStream = await dockerClient.execByName(containerName, cmd);
    const output = await resolveDockerStream(resultStream);

    debug(
      `containerName: ${containerName}`,
      `command: ${cmd}`,
      `options: ${options}`,
      `result: ${output}`
    );

    res.status(200).send({ output });
  })
);

router.post("/", async (req, res) => {
  const docker = req.app.get("docker");
  const result = await docker.createDefaultTerminal("ubuntu");

  if (!result) {
    res.status(400).json({ message: "not created terminal" });
    return;
  }

  res.status(201).json({ containerId: result });
});

module.exports = router;

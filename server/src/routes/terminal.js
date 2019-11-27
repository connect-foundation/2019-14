const debug = require("debug")("boostwriter:routes:terminal");
const express = require("express");
const { StreamResolver } = require("../utils/stream-resolver");
const { utils } = require("../utils");

const { wrapAsync } = utils;

const router = express.Router();

const {
  createDefaultTerminal,
  startTerminal,
  stopTerminal,
} = require("../controller/terminal");

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

router.post(
  "/command/not-pending",
  wrapAsync(async (req, res) => {
    const { containerName, cmd, options } = req.body;
    const dockerClient = req.app.get("docker");

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

router
  .route("/")
  .post(
    wrapAsync(async (req, res) => {
      const docker = req.app.get("docker");
      const result = await createDefaultTerminal(docker, "ubuntu");

      if (!result) {
        res.status(400).json({ message: "not created terminal" });
        return;
      }

      res.status(201).json({ containerId: result });
    })
  )
  .patch(
    wrapAsync(async (req, res) => {
      const docker = req.app.get("docker");
      const { containerId } = req.body;
      const result = await startTerminal(docker, containerId);

      res.status(200).json(result);
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const docker = req.app.get("docker");
      const { containerId } = req.body;
      const result = await stopTerminal(docker, containerId);

      res.status(200).json(result);
    })
  );

module.exports = router;

const debug = require("debug")("boostwriter:routes:terminal");
const express = require("express");
const { utils, StreamResolver } = require("../utils");

const { wrapAsync } = utils;

const router = express.Router();

const {
  createDefaultTerminal,
  startTerminal,
  stopTerminal,
  saveTerminal,
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
    const { containerId, cmd, options } = req.body;
    const dockerClient = req.app.get("docker");

    const resultStream = await dockerClient.execById(containerId, cmd);
    const output = await resolveDockerStream(resultStream);

    debug(
      `containerId: ${containerId}`,
      `command: ${cmd}`,
      `options: ${options}`,
      `result: ${output}`
    );

    res.status(200).send({ output });
  })
);

router.post(
  "/command/pending",
  wrapAsync(async (req, res) => {
    const { containerId, cmd, stdin } = req.body;
    const dockerClient = req.app.get("docker");

    const resultStream = await dockerClient.execPendingById(containerId, cmd);
    if (stdin.length > 0) {
      resultStream.write(stdin);
    }

    resultStream.on("data", (chunk) => {
      const encodedStr = chunk.toString("utf8");
      debug("pending chunk", encodedStr);
      res.write(encodedStr);
    });

    resultStream.on("end", () => {
      debug("pending is end");
      res.status(200).end();
    });

    resultStream.on("error", (err) => {
      debug("pending is err", err);
      if (err) {
        throw err;
      }
      res.status(204).end();
    });

    resultStream.end();
  })
);

router
  .route("/")
  .post(
    wrapAsync(async (req, res) => {
      const { dockerData } = req.body;
      const docker = req.app.get("docker");
      const result = await createDefaultTerminal(docker, dockerData);

      if (!result) {
        res.status(400).json({ message: "not created terminal" });
        return;
      }

      res.status(201).json({ containerId: null });
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

router.route("/temp").put(
  wrapAsync(async (req, res) => {
    const docker = req.app.get("docker");
    const { containerId } = req.body;
    const result = await saveTerminal(docker, containerId);

    res.status(200).json(result);
  })
);

module.exports = router;

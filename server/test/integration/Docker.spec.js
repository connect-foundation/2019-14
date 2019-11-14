const path = require("path");

const resolvedPath = path.resolve(process.cwd(), "test.env");
require("dotenv").config({
  path: resolvedPath,
});
const { expect } = require("chai");
const { DockerApi } = require("../../src/api/Docker.js");

const remoteIp = process.env.REMOTE_DOCKER_IP;
const remotePort = process.env.REMOTE_DOCKER_PORT;

const connectOptions = {
  right: {
    host: remoteIp,
    port: remotePort,
    version: "v1.40",
  },
  wrongPort: {
    host: remoteIp,
    port: 8000,
    version: "v1.40",
  },
  noVersion: {
    host: remoteIp,
    port: remotePort,
  },
};

const testcases = {
  exec: {
    options: connectOptions.right,
    id: "d5d08093284f",
    cmd: "echo 'hello'",
    answer: "hello",
  },
};

const streamResolver = (stream) => {
  return new Promise((resolve, reject) => {
    let result = "";
    stream.on("data", (chunk) => {
      // https://github.com/moby/moby/issues/7375#issuecomment-51462963
      // docker special character prefix
      result = chunk.slice(8).toString();
    });

    stream.on("end", () => {
      // delete \n
      resolve(result.slice(0, -1));
    });
  });
};

describe("DockerApi", () => {
  it("container에 not-pending 형식의 명령어를 수행할 수 있다", async () => {
    const testcase = testcases.exec;
    const dockerClient = new DockerApi(testcase.options);
    await dockerClient.init();

    const stream = await dockerClient.execById(testcase.id, testcase.cmd);

    const result = await streamResolver(stream);

    expect(result).to.be.equal(testcase.answer);
  });
});

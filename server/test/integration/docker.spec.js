require("../../src/env-loader").appendEnv("test");

const { expect } = require("chai");
const { DockerApi, SIGNAL_TYPE } = require("../../src/api/docker");
const { StreamResolver } = require("../../src/utils/stream-resolver");
const { containers } = require("../docker-setup");

const remoteIp = process.env.REMOTE_DOCKER_IP;
const remotePort = process.env.REMOTE_DOCKER_PORT;
const caPath = process.env.SSL_CA_PATH;
const certPath = process.env.SSL_CERT_PATH;
const keyPath = process.env.SSL_KEY_PATH;

const connectOptions = {
  right: {
    host: remoteIp,
    port: remotePort,
    version: "v1.40",
    caPath,
    certPath,
    keyPath,
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
  execById: {
    options: connectOptions.right,
    id: containers.ubuntu.id,
    cmd: "echo 'hello'",
    answer: "hello\n",
  },

  execByName: [
    {
      options: connectOptions.right,
      name: containers.ubuntu.name,
      cmd: "echo 'hello'",
      answer: "hello\n",
    },
  ],

  sendSignal: [
    {
      options: connectOptions.right,
      id: containers.ubuntu.id,
      cmd: ["SIGINT"],
    },
  ],

  execPendingById: [
    {
      options: connectOptions.right,
      id: containers.ubuntu.id,
      startCmd: "cat > hello.txt",
      endCmd: "cat hello.txt",
      clearCmd: "rm hello.txt",
      contents: ["hello\n", "world\n", "bye"],
      answer: "hello\nworld\nbye",
    },
  ],
};

describe("DockerApi", () => {
  it("container id로 not-pending 명령어를 수행할 수 있다", async () => {
    const testcase = testcases.execById;
    const dockerClient = new DockerApi(testcase.options);
    await dockerClient.init();

    const stream = await dockerClient.execById(testcase.id, testcase.cmd);

    const resolver = new StreamResolver(stream);
    const rawString = await resolver.flush();

    const result = rawString.slice(8);
    expect(result).to.be.equal(testcase.answer);
  });

  it("container name으로 not-pending 명령을 실행할 수 있다", (done) => {
    const isDone = testcases.execByName.map(async (testcase) => {
      const dockerClient = new DockerApi(testcase.options);
      await dockerClient.init();

      const stream = await dockerClient.execByName(testcase.name, testcase.cmd);

      const resolver = new StreamResolver(stream);
      const rawString = await resolver.flush();

      const result = rawString.slice(8);
      expect(result).to.be.equal(testcase.answer);
    });
    Promise.all(isDone).then(() => {
      done();
    });
  });

  it("container id로 system signal을 보낼 수 있다.", (done) => {
    const isDone = testcases.sendSignal.map(async (testcase) => {
      const dockerClient = new DockerApi(testcase.options);
      await dockerClient.init();

      const result = await dockerClient.sendSignal(
        testcase.id,
        SIGNAL_TYPE.SIGINT
      );
      console.log("signaling", result);
    });
    Promise.all(isDone).then(() => {
      done();
    });
  });

  it("container id로 pending 명령을 실행할 수 있다.", (done) => {
    const isDone = testcases.execPendingById.map(async (testcase) => {
      const dockerClient = new DockerApi(testcase.options);
      await dockerClient.init();

      const pendingStream = await dockerClient.execPendingById(testcase.id, testcase.startCmd);
      testcase.contents.map((content) => {
        pendingStream.write(content);
      });
      pendingStream.end();

      const resultStream = await dockerClient.execById(testcase.id, testcase.endCmd);
      await dockerClient.execById(testcase.id, testcase.clearCmd);

      const resolver = new StreamResolver(resultStream);
      const rawString = await resolver.flush();

      const result = rawString.slice(8);
      expect(result).to.be.equal(testcase.answer);
    });
    Promise.all(isDone).then(() => {
      done();
    });
  });
});

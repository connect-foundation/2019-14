const debug = require("debug")("boostwriter:api:Docker");
const fs = require("fs");
const Docker = require("dockerode");

const changeToFormattedName = (name) => {
  const startFormat = "/";
  if (name.startsWith(startFormat)) {
    return name;
  }
  return `${startFormat}${name}`;
};

class DockerApi {
  constructor(options) {
    const defaultOptions = {
      version: "v1.40",
      caPath: "~/.docker/ca.pem",
      certPath: "~/.docker/cert.pem",
      keyPath: "~/.docker/key.pem",
      socketPath: null,
    };
    const requestOptions = {
      ...defaultOptions,
      ...options,
    };

    if (requestOptions.caPath) {
      requestOptions.ca = fs.readFileSync(requestOptions.caPath);
    }

    if (requestOptions.certPath) {
      requestOptions.cert = fs.readFileSync(requestOptions.certPath);
    }

    if (requestOptions.keyPath) {
      requestOptions.key = fs.readFileSync(requestOptions.keyPath);
    }

    debug(`Docker Api create request with`, requestOptions);

    this.request = new Docker(requestOptions);
  }

  async init() {
    const infos = await this.request.listContainers();
    this.containerInfos = infos.map((info) => {
      const keys = Object.keys(info);
      const lowerCasedObject = {};
      keys.forEach((key) => {
        lowerCasedObject[key.toLowerCase()] = info[key];
      });
      return lowerCasedObject;
    });
  }

  async execById(containerId, commandString = "") {
    const noContainer =
      this.containerInfos.find((info) => {
        // support compressed-hash and full-hash
        return info.id.startsWith(containerId);
      }) === undefined;
    if (noContainer) {
      return null;
    }

    const container = await this.request.getContainer(containerId);
    const exec = await container.exec({
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["/bin/sh", "-c", commandString],
    });
    const containerStream = await exec.start();
    return containerStream;
  }

  async execByName(containerName, commandString = "") {
    const formattedName = changeToFormattedName(containerName);
    const isUsedName = (info) => {
      return info.names.includes(formattedName);
    };
    const targetInfo = this.containerInfos.find(isUsedName);
    if (!targetInfo) {
      return null;
    }
    const container = await this.request.getContainer(targetInfo.id);
    const exec = await container.exec({
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["/bin/sh", "-c", commandString],
    });
    const containerStream = await exec.start();
    return containerStream;
  }

  async createCustomTerminal(userTerminalInfo) {

    if (!userTerminalInfo) {
      const defaultBaseImage = "ubuntu";
      return this.createContainer(defaultBaseImage);
    }
    // TODO 유저 입력 파싱
    const defaultOptions = {
      context: __dirname,
      src: ["Dockerfile"],
    }

    const imageTag = {
      t: "test"
    }

    const progressCallback = (err, data) => {
      if (err) {
        console.log(err);
      }
    }

    const finishCallback = (err, data) => {
      if (err) {
        console.log(err);
      }
    }

    const stream = await this.request.buildImage(defaultOptions, imageTag);

    this.request.modem.followProgress(stream, progressCallback, finishCallback);
  }

  async createDefaultTerminal(baseImageName) {
    // TOOD 초기 하드코딩 값 변경하거나 없앨 것
    const defaultCmd = ["/bin/bash"];
    const defaultTagName = "ubuntu-container-test";
    let newContainerId = "";

    await this.request.createContainer({
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Image: baseImageName,
      Cmd: defaultCmd,
      name: defaultTagName,
      Tty: true,
    })
    .then((container) => {
      newContainerId = container.id;
    })
    .catch((err) => {
      console.log(err);
    });

    return newContainerId;
  }
}

module.exports = { DockerApi };

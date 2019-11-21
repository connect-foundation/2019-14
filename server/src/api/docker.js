const debug = require("debug")("boostwriter:api:Docker");
const fs = require("fs");
const Docker = require("dockerode");

const SIGNAL_TYPE = {
  SIGINT: 2,
  SIGKILL: 9,
};

const changeToFormattedName = (name) => {
  const startFormat = "/";
  if (name.startsWith(startFormat)) {
    return name;
  }
  return `${startFormat}${name}`;
};

const exec = async (container, commandString = "", options = {}) => {
  if (!container) {
    return null;
  }

  const defaultOptions = {
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Cmd: ["/bin/sh", "-c", commandString],
  };

  const command = await container.exec({ ...defaultOptions, ...options });

  const commandOptions = {
    hijack: false,
    stdin: false,
  };

  if (options.isPending) {
    commandOptions.hijack = true;
    // commandOptions.stdin = true;
  }

  const containerStream = await command.start(commandOptions);
  return containerStream;
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
    const isCached = this.isContainerExist(containerId);

    if (!isCached) {
      return null;
    }

    const container = await this.request.getContainer(containerId);

    const containerStream = await exec(container, commandString);
    return containerStream;
  }

  async execByName(containerName, commandString = "") {
    const containerId = this.convertToContainerId(containerName);

    const container = await this.request.getContainer(containerId);

    const containerStream = await exec(container, commandString);

    return containerStream;
  }

  async sendSignal(containerId, signalNumber = SIGNAL_TYPE.SIGINT) {
    const isCached = this.isContainerExist(containerId);

    if (!isCached) {
      return null;
    }

    const container = await this.request.getContainer(containerId);

    const result = await container.kill({
      id: containerId,
      signal: signalNumber,
    });
    return result;
  }

  async execPendingById(containerId, commandString = "") {
    const isCached = this.isContainerExist(containerId);

    if (!isCached) {
      return null;
    }

    const container = await this.request.getContainer(containerId);

    const containerStream = await exec(container, commandString, {
      isPending: true,
    });

    return containerStream;
  }

  convertToContainerId(containerName = "") {
    const formattedName = changeToFormattedName(containerName);

    const isUsedName = (info) => {
      return info.names.includes(formattedName);
    };

    const targetInfo = this.containerInfos.find(isUsedName);

    return targetInfo ? targetInfo.id : null;
  }

  isContainerExist(containerId) {
    return this.containerInfos.some((info) => {
      // support compressed-hash and full-hash
      return info.id.startsWith(containerId);
    });
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
    };

    const imageTag = {
      t: "test",
    };

    const progressCallback = (err) => {
      if (err) {
        debug("progress", err);
      }
    };

    const finishCallback = (err) => {
      if (err) {
        debug("finish", err);
      }
    };

    const stream = await this.request.buildImage(defaultOptions, imageTag);

    this.request.modem.followProgress(stream, progressCallback, finishCallback);

    // TODO: refactor
    return null;
  }

  async createDefaultTerminal(baseImageName) {
    // TOOD 초기 하드코딩 값 변경하거나 없앨 것
    const defaultCmd = ["/bin/bash"];
    const defaultTagName = "ubuntu-container-test";

    const newContainerInfo = await this.request.createContainer({
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Image: baseImageName,
      Cmd: defaultCmd,
      name: defaultTagName,
      Tty: true,
    });

    return newContainerInfo.id;
  }
}

module.exports = { DockerApi, SIGNAL_TYPE };

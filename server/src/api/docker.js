const debug = require("debug")("boostwriter:api:Docker");
const fs = require("fs");
const Docker = require("dockerode");
const uuid = require("uuid/v4");

const SIGNAL_TYPE = {
  SIGINT: 2,
  SIGKILL: 9,
};

const NETWORK_USAGE_LIMIT = 300000;

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
      caPath: "ca.pem",
      certPath: "cert.pem",
      keyPath: "key.pem",
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
    // const isCached = this.isContainerExist(containerId);

    // TODO cache 처리 추가할 것

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

  async createCustomTerminal(dockerFilePath) {
    const imageTagName = uuid();
    // TODO 유저 입력 파싱
    const defaultOptions = {
      context: dockerFilePath,
      src: ["Dockerfile"],
    };

    const imageTag = {
      t: imageTagName,
    };

    try {
      const stream = await this.request.buildImage(defaultOptions, imageTag);
      await this.followProgressAsync(stream);
      debug("next to follow progress");
      const result = await this.createDefaultTerminal(imageTagName);
      return result;
    } catch (err) {
      debug("createCustomTerminal error", err);
      return err;
    }
    // TODO: refactor
  }

  followProgressAsync(stream) {
    return new Promise((resolve, reject) => {
      const onProgress = (data) => {
        debug("following progress", data);
        console.log("following progress", data);
      };

      const onFinish = async (err, data) => {
        if (err) {
          console.log("progress finish err", err, data);
          return reject(err);
        }
        debug("finish follow progressing", data);
        console.log("finish follow progressing", data);
        resolve(data);
      };
      this.request.modem.followProgress(stream, onFinish, onProgress);
    });
  }

  async createDefaultTerminal(baseImageName) {
    // TOOD 초기 하드코딩 값 변경하거나 없앨 것
    const defaultCmd = ["/usr/sbin/sshd", "-D"];
    const newContainerInfo = await this.request.createContainer({
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Image: baseImageName,
      Cmd: defaultCmd,
      Tty: true,
      ExposedPorts: {
        "22/tcp": {},
      },
      HostConfig: {
        PortBindings: {
          "22/tcp": [{}],
        },
      },
    });
    // TODO startContainer 결과를 합쳐서 리턴 할 것
    await this.startContainer(newContainerInfo.id);
    const containerInfo = await this.inspectContainer(newContainerInfo.id);
    const result = {
      containerId: newContainerInfo.id,
      portBinding: containerInfo.NetworkSettings.Ports["22/tcp"][0].HostPort,
    };
    return result;
  }

  async startContainer(containerId) {
    const container = await this.request.getContainer(containerId);
    const result = await container.start();
    return result;
  }

  async stopContainer(containerId) {
    const container = await this.request.getContainer(containerId);
    const result = await container.stop();
    return result;
  }

  async saveContainer(containerId) {
    const container = await this.request.getContainer(containerId);
    const result = await container.commit(containerId);
    return result;
  }

  async getActiveContainers() {
    const containers = await this.request.listContainers({
      status: ["running"],
    });

    return containers;
  }

  async monitorContainer(containerId) {
    const container = await this.request.getContainer(containerId);

    let totalNetworksUsage = 0;

    const userMetric = await container.stats({
      id: containerId,
      stream: false,
    });

    if (!userMetric || !userMetric.networks) {
      return false;
    }

    Object.keys(userMetric.networks).forEach(async (element) => {
      totalNetworksUsage += userMetric.networks[element].rx_bytes;
      totalNetworksUsage += userMetric.networks[element].tx_bytes;
    });

    if (totalNetworksUsage > NETWORK_USAGE_LIMIT) {
      await container.stop();
    }

    return true;
  }

  async inspectContainer(containerId) {
    const container = this.request.getContainer(containerId);
    const containerInfo = await container.inspect();
    return containerInfo;
  }
}

module.exports = { DockerApi, SIGNAL_TYPE };

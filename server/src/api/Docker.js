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
}

module.exports = { DockerApi };

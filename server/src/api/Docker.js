const fs = require("fs");
const Docker = require("dockerode");

class DockerApi {
  constructor(options) {
    const requestOptions = {
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

    this.request = new Docker({ ...requestOptions, socketPath: null });
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
}

module.exports = { DockerApi };

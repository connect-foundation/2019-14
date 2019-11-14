const Docker = require("dockerode");

class DockerApi {
  constructor(options) {
    this.request = new Docker({ ...options, socketPath: null });
  }

  async init() {
    const infos = await this.request.listContainers();
    this.containerInfos = infos.map((info) => {
      const keys = Object.keys(info);
      const lowerCasedObject = keys.reduce((result, key) => {
        result[key.toLowerCase()] = info[key];
        return result;
      }, {});
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

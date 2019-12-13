const debug = require("debug")("boostwriter:controller:terminal");
const { writeDockerfile } = require("../api/makeDockerfile");

const createDefaultTerminal = async (dockerInstance, terminalOption) => {
  const dockerFilePath = `${process.env.INIT_CWD}/dockerfiles/`;
  try {
    await writeDockerfile(terminalOption);

    debug("write docker file");

    const result = await dockerInstance.createCustomTerminal(dockerFilePath);

    debug("create terminal", result);

    return result;
  } catch (err) {
    debug("create default terminal", err);
  }
};

const startTerminal = async (dockerInstance, containerId) => {
  const result = await dockerInstance.startContainer(containerId);
  return result;
};

const stopTerminal = async (dockerInstance, containerId) => {
  const result = await dockerInstance.stopContainer(containerId);
  return result;
};

const saveTerminal = async (dockerInstance, containerId) => {
  const result = await dockerInstance.saveContainer(containerId);
  return result;
};

module.exports = {
  createDefaultTerminal,
  startTerminal,
  stopTerminal,
  saveTerminal,
};

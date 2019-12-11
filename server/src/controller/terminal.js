const debug = require("debug");
const { writeDockerfile } = require("../api/makeDockerfile");

const createDefaultTerminal = async (dockerInstance, terminalOption) => {
  const dockerFilePath = `${process.env.INIT_CWD}/dockerfiles/`;
  try {
    await writeDockerfile(terminalOption);

    const containerId = await dockerInstance.createCustomTerminal(
      dockerFilePath
    );
    return containerId;
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

module.exports = {
  createDefaultTerminal,
  startTerminal,
  stopTerminal,
};

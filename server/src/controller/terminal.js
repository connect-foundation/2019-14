const {
  parseTerminalOption,
  writeDockerfile,
} = require("../api/makeDockerfile");

const createDefaultTerminal = async (dockerInstance, terminalOption) => {
  const dockerFilePath = `${process.env.INIT_CWD}/dockerfiles/`;

  try {
    const dockerContents = parseTerminalOption(terminalOption);

    await writeDockerfile(dockerContents);
  } catch (err) {
    console.log(err);
    return null;
  }

  const containerId = await dockerInstance.createCustomTerminal(dockerFilePath);
  return containerId;
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

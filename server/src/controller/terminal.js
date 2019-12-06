const createDefaultTerminal = async (
  dockerInstance,
  baseImageName = "ubuntu"
) => {
  const containerId = await dockerInstance.createDefaultTerminal(baseImageName);
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

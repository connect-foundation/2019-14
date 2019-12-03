const createDefaultTerminal = async (
  dockerInstance,
  baseImageName = "ubuntu"
) => {
  const containerId = await dockerInstance.createDefaultTerminal(baseImageName);
  const container = await dockerInstance.getContainer(containerId);
  const result = await dockerInstance.startContainer(container);
  return result;
};

const startTerminal = async (dockerInstance, containerId) => {
  const container = await dockerInstance.getContainer(containerId);
  const result = await dockerInstance.startContainer(container);
  return result;
};

const stopTerminal = async (dockerInstance, containerId) => {
  const container = await dockerInstance.getContainer(containerId);
  const result = await dockerInstance.stopContainer(container);
  return result;
};

module.exports = {
  createDefaultTerminal,
  startTerminal,
  stopTerminal,
};

function Terminal() {}

Terminal.prototype.createDefaultTerminal = async (
  dockerInstance,
  baseImageName = "ubuntu"
) => {
  const containerId = await dockerInstance.createDefaultTerminal(baseImageName);
  return containerId;
};

Terminal.prototype.terminalStart = async (dockerInstance, containerId) => {
  const result = await dockerInstance.startContainer(containerId);
  return result;
};

module.exports = Terminal;

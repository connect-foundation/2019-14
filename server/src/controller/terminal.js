const { writeDockerfile } = require("../api/makeDockerfile");

const createDefaultTerminal = async (
  dockerInstance,
  baseImageName = ["ubuntu"]
) => {
  const dockerFilePath = `${process.env.INIT_CWD}/dockerfiles/`;
  // TODO 사용자 도커 환경 정보 파싱(도커파일 규격에 맞는 형식으로)
  const dockerfile = baseImageName.reduce((accumulate, element) => {
    return `${accumulate} FROM ${element}\n`;
  }, "");

  try {
    await writeDockerfile(dockerfile);
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

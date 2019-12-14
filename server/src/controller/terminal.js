const debug = require("debug")("boostwriter:controller:terminal");
const { writeDockerfile } = require("../api/makeDockerfile");
const validImages = require("../dockerImages");

const makeImageNameString = (terminalOption) => {
  let userEnvironment = [];
  Object.values(terminalOption).forEach((element) => {
    userEnvironment = userEnvironment.concat(element);
  });

  return validImages[userEnvironment.join("/")];
};

const createDefaultTerminal = async (dockerInstance, terminalOption) => {
  const dockerFilePath = `${process.env.INIT_CWD}/dockerfiles/`;
  const imageTag = makeImageNameString(terminalOption);

  try {
    if (!imageTag) {
      debug("write docker file");

      await writeDockerfile(terminalOption);
      const result = await dockerInstance.createCustomTerminal(dockerFilePath);
      return result;
    }

    const result = dockerInstance.createDefaultTerminal(imageTag);
    // TODO 이미지 tag로 컨테이너 생성하기
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
  makeImageNameString,
};

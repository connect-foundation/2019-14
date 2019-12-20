const path = require("path");
const debug = require("debug")("boostwriter:controller:terminal");
const { writeDockerfile } = require("../api/make-dockerfile");
const validImages = require("../docker-images");

const makeImageNameString = (terminalOption) => {
  let userSelectionEnvironment = [];

  Object.values(terminalOption).forEach((environment) => {
    userSelectionEnvironment = userSelectionEnvironment.concat(environment);
  });

  userSelectionEnvironment.sort();

  return validImages[userSelectionEnvironment.join("/")];
};

const createDefaultTerminal = async (dockerInstance, terminalOption) => {
  const rootDir = path.resolve(__dirname, "../../");
  const dockerFilePath = `${rootDir}/dockerfiles/`;
  const imageTag = makeImageNameString(terminalOption);

  try {
    if (!imageTag) {
      debug("write docker file");

      await writeDockerfile(terminalOption);
      const result = await dockerInstance.createCustomTerminal(dockerFilePath);
      return result;
    }

    const result = await dockerInstance.createDefaultTerminal(imageTag);
    // TODO 이미지 tag로 컨테이너 생성하기
    debug("create terminal", result);

    return result;
  } catch (err) {
    debug("create default terminal", err);
    throw err;
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

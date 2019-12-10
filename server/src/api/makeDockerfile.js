const fs = require("fs").promises;

const makeCentosTypeTerminalText = (terminalOption) => {
  let dockerText = `FROM ${terminalOption.OS[0]}:7`;
  dockerText = `${dockerText}\nRUN yum update -y && yum install -y openssh-server`;

  terminalOption.DB.forEach((element) => {
    if (element === "mongo") {
      dockerText = `${dockerText} mongodb-org`;
    }

    if (element === "mysql") {
      dockerText = `${dockerText} mysql-community-server`;
    }
  });

  terminalOption.PL.forEach((element) => {
    dockerText = `${dockerText} ${element}`;
  });

  return dockerText;
};
// 같은 이름의 파일은 덮어 씀
const writeDockerfile = async (text) => {
  const data = new Uint8Array(Buffer.from(text));
  const result = await fs.writeFile(
    `${process.env.INIT_CWD}/dockerfiles/Dockerfile`,
    data
  );
  return result;
};

const makeDockerfile = async (text) => {
  try {
    await fs.open(
      // TODO 하드 코딩 경로 수정 할 것
      `${process.env.INIT_CWD}/dockerfiles/Dockerfile`,
      "wx"
    );
    const result = await writeDockerfile(text);
    return result;
  } catch (err) {
    if (err.code === "EEXIST") {
      console.error("myfile already exists");
      return;
    }
    throw err;
  }
};

module.exports = { writeDockerfile };

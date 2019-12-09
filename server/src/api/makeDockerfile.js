const path = require("path");
const fs = require("fs").promises;

const parseTerminalOption = (terminalOption) => {
  let result = `FROM ${terminalOption.OS[0]}`;

  if (!terminalOption.PL.length && !terminalOption.DB.length) return result;

  if (terminalOption.OS[0] === "ubuntu") {
    result = `${result}\nRUN apt-get update -y && apt-get install -y `;
  }

  terminalOption.PL.forEach((element) => {
    result = `${result} ${element}`;
  });

  terminalOption.DB.forEach((element) => {
    result = `${result} ${element}`;
  });

  return result;
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

module.exports = { parseTerminalOption, writeDockerfile };

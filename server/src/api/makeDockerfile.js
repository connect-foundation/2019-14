const path = require("path");
const fs = require("fs").promises;

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

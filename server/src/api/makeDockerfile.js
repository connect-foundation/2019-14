const path = require("path");
const fs = require("fs").promises;

// 같은 이름의 파일은 덮어 씀
const writeDockerfile = async (text) => {
  const data = new Uint8Array(Buffer.from(text));
  console.log(process.env.INIT_CWD);
  await fs.writeFile(`${process.env.INIT_CWD}/dockerfiles/Dockerfile`, data);
};

const makeDockerfile = async (text) => {
  await fs.open(
    // TODO 하드 코딩 경로 수정 할 것
    `${process.env.INIT_CWD}/dockerfiles/Dockerfile`,
    "wx",
    async (err, fd) => {
      if (err) {
        if (err.code === "EEXIST") {
          console.error("myfile already exists");
          return;
        }
        throw err;
      }
      const result = await writeDockerfile(text);
      console.log(result);
      return result;
    }
  );
};

module.exports = { writeDockerfile };

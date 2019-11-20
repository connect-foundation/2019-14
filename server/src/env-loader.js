const path = require("path");
const dotenv = require("dotenv");

const ENV = {
  REMOTE: "remote",
  LOCAL: "local",
  TEST: "test",
};

const appendEnv = (env = ENV.REMOTE) => {
  const resolvedPath = path.resolve(process.cwd(), `${env}.env`);
  return dotenv.config({
    path: resolvedPath,
  });
};

module.exports = {
  appendEnv,
};

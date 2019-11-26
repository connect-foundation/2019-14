function test(params) {
  return `jest ${params}`;
}

module.exports = {
  scripts: {
    default: {
      script: "serve -l 7070 dist",
      description: "Start app with 'npm start or nps'",
    },
    build: {
      default: {
        script: "webpack --config webpack.production.config.js",
        description: "Start client build",
      },
    },
    dev: {
      default: {
        script: "webpack-dev-server",
        description: "Start dev server for local testing",
      },
    },
    lint: {
      default: {
        script: "nps lint.code",
        description: "Default lint",
      },
      code: {
        script: "eslint src",
        description: "Lint for code",
      },
    },
    test: {
      default: {
        script: `nps ${["test.unit"].join(" ")}`,
      },
      unit: {
        script: test("test/unit"),
        description: "Unit test",
      },
    },
  },
};

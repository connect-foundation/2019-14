function test(params) {
  return `mocha --recursive ${params}`;
}

module.exports = {
  scripts: {
    default: {
      script: "node bin/index.js",
      description: "Start app",
    },
    production: {
      script: "NODE_ENV=production node bin/index.js",
      description: "Start production app",
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
        script: `nps ${["test.unit", "test.integration"].join(" ")}`,
      },
      unit: {
        script: test("test/unit"),
        description: "Unit test",
      },
      integration: {
        script: test("test/integration"),
        description: "Integrate test",
      },
    },
  },
};

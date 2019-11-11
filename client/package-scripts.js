function test(params) {
  return `mocha ${params}`;
}

module.exports = {
  scripts: {
    default: {
      script: "node index.js",
      description: "Start app",
    },
    lint: {
      default: {
        script: "nps lint.code",
        description: "Default lint",
      },
      code: {
        script: "eslint .",
        description: "Lint for code",
      },
    },
    test: {
      default: {
        script: `nps ${["test.unit"].join(" ")}`,
      },
      unit: {
        script: test("test/unit/*.spec.js"),
        description: "Unit test",
      },
    },
  },
};

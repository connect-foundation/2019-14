require("../../src/env").appendEnv("test");

const request = require("supertest");
const { expect } = require("chai");
const { containers } = require("../DockerSetup.js");
const app = require("../../src/app");

const testcases = {
  notPending: {
    input: {
      containerName: containers.ubuntu.name,
      cmd: "echo 'hello'"
    },
    output: "hello",
  },
};

describe("Terminal Router", () => {
  it("not-pending 쉘 명령을 수행할 수 있다", function (done) {
		const testcase = testcases.notPending;
    const agent = request.agent(app);
    agent
      .post(`/api/terminal/command/not-pending`)
      .set("Accept", "application/json")
      .send(testcase.input)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.output).to.be.equal(testcase.output);
        done();
      });
  });
});

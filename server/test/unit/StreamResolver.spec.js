const { PassThrough } = require("stream");
const { expect } = require("chai");
const { StreamResolver } = require("../../src/api/StreamResolver");

const testcases = {
  normal: [
    {
      answer: "hello world",
    },
  ],
};

describe("StreamResolver", () => {
  it("데이터 스트림에 있는 모든 데이터를 한번에 읽는다", (done) => {
    const isDone = testcases.normal.map(async (testcase) => {
      const pass = new PassThrough(testcase.options);
      pass.write(testcase.answer);
      pass.end();

      const resolver = new StreamResolver(pass);
      const resultString = await resolver.flush();

      expect(resultString).to.be.equal(testcase.answer);
    });
    Promise.all(isDone).then(() => {
      done();
    });
  });
});

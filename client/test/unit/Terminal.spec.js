import TestStore from "../TestStore";
import { terminalActionCreator } from "../../src/actions/TerminalAction";
import terminalReducer from "../../src/reducers/TerminalReducer";
import { utils } from "../../src/utils";

const { deepCopy } = utils;

const storeStates = {
  empty: {
    focusIndex: 0,
    currentText: "current",
    inputTexts: [],
    isActives: [],
    outputTexts: [],
    isLoadings: [],
    replCount: 0,
  },
  front: {
    focusIndex: 0,
    currentText: "current",
    inputTexts: ["one", "two", "three"],
    isActives: [true, true, true],
    outputTexts: ["one1", "two1", "three1"],
    isLoadings: [false, false, false],
    replCount: 3,
  },
  middle: {
    focusIndex: 2,
    currentText: "current",
    inputTexts: ["one", "two", "three", "four"],
    isActives: [true, true, true, true],
    outputTexts: ["one1", "two1", "three1", "four1"],
    isLoadings: [false, false, false, false],
    replCount: 4,
  },
  end: {
    focusIndex: 2,
    currentText: "current",
    inputTexts: ["hello", "world"],
    isActives: [true, true],
    outputTexts: ["hello1", "world1"],
    isLoadings: [false, false],
    replCount: 2,
  },
};

const testcases = {
  newRepl: [
    {
      storeState: deepCopy(storeStates.empty),
      answer: {
        focusIndex: 1,
        currentText: "",
        inputTexts: ["current"],
        isActives: [false],
        outputTexts: [""],
        isLoadings: [true],
        replCount: 1,
      },
    },
  ],
};

describe("Terminal Cell", () => {
  it("새로운 셀을 생성후 포커스 위치로 입력창이 이동된다", (done) => {
    const isDone = testcases.newRepl.map(async (testcase) => {
      const { storeState, answer } = testcase;
      const store = new TestStore(terminalReducer, storeState);
      const nextState = await store.dispatchAsync(
        terminalActionCreator.createNewRepl()
      );

      expect(nextState).toEqual(answer);
    });
    Promise.all(isDone).then(() => {
      done();
    });
  });
});

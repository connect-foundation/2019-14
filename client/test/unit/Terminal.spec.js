import TestStore from "../TestStore";
import {
  TERMINAL_ACTION,
  terminalActionCreator,
} from "../../src/actions/TerminalAction";
import terminalReducer from "../../src/reducers/TerminalReducer";
import { utils } from "../../src/utils";

const { deepCopy } = utils;

const storeStates = {
  empty: {
    focusIndex: 0,
    currentText: "current",
    inputTexts: [],
    outputTexts: [],
    replCount: 0,
  },
  front: {
    focusIndex: 0,
    currentText: "current",
    inputTexts: ["one", "two", "three"],
    outputTexts: ["one1", "two1", "three1"],
    replCount: 3,
  },
  middle: {
    focusIndex: 2,
    currentText: "current",
    inputTexts: ["one", "two", "three", "four"],
    outputTexts: ["one1", "two1", "three1", "four1"],
    replCount: 4,
  },
  end: {
    focusIndex: 2,
    currentText: "current",
    inputTexts: ["hello", "world"],
    outputTexts: ["hello1", "world1"],
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
        outputTexts: [""],
        replCount: 1,
      },
    },
  ],
};

describe("Terminal Cell", () => {
  it("새로운 셀을 생성후 포커스 위치로 입력창이 이동된다", (done) => {
    const isDone = testcases.newRepl.map(async (testcase) => {
      const { storeState, focusIndex, currentText, answer } = testcase;
      const store = new TestStore(terminalReducer, storeState);
      const nextState = await store.dispatchAsync(
        terminalActionCreator.createNewRepl(focusIndex, currentText)
      );

      expect(nextState).toEqual(answer);
    });
    Promise.all(isDone).then(() => {
      done();
    });
  });
});

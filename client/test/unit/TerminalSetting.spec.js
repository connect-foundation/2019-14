import {
  TERMINAL_SETTING_ACTION,
  terminalSettingActionCreator as tsActionCreator,
} from "../../src/actions/TerminalSettingAction";
import terminalSettingReducer from "../../src/reducers/TerminalSettingReducer.js";

class TestStore {
  constructor(reducer, state = {}) {
    this.state = state;
    this.reducer = reducer;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    return this.state;
  }
};

const testcases = {
  open: [
    {
      init: {
        isTerminalSettingOpen: false,
        options: [],
      },
      answer: true,
    },
  ],
};

describe("Terminal Setting Side Window", () => {

  it("open window", () => {
    testcases.open.map((testcase) => {
      const { init, answer } = testcase;
      const store = new TestStore(terminalSettingReducer, init);
      const nextState = store.dispatch(tsActionCreator.open());
      expect(nextState.isTerminalSettingOpen).toEqual(answer);
    });
  });
});


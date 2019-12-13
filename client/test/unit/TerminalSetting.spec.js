import TestStore from "../TestStore";

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

xdescribe("Terminal Setting Side Window", () => {
  it("open window", () => {
    testcases.open.map((testcase) => {
      const { init, answer } = testcase;
      const store = new TestStore(terminalSettingReducer, init);
      const nextState = store.dispatch(tsActionCreator.open());
      expect(nextState.isTerminalSettingOpen).toEqual(answer);
    });
  });
});

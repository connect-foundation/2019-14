import { TERMINAL_ACTION } from "../actions/TerminalAction";
import { utils } from "../utils";

const { deepCopy, splice } = utils;

const terminalReducerHandler = {
  [TERMINAL_ACTION.NEW_REPL]: (state, action) => {
    let { index, inputText } = action;
    const prevState = deepCopy(state);

    const replCount = prevState.replCount + 1;

    const isLastIndex = index === -1;
    if (isLastIndex) {
      index = replCount;
    }

    const isUsingCurrentText = inputText === null;
    if (isUsingCurrentText) {
      inputText = prevState.currentText;
    }

    const inputTexts = splice.addBefore(prevState.inputTexts, index, inputText);
    const isActives = splice.addBefore(prevState.isActives, index, false);

    const outputTexts = splice.addBefore(prevState.outputTexts, index, "");
    const isLoadings = splice.addBefore(prevState.isLoadings, index, true);

    return {
      focusIndex: index,
      currentText: "",

      inputTexts,
      isActives,

      outputTexts,
      isLoadings,

      replCount,
    };
  },

  // [TERMINAL_ACTION.EVAL_INPUT]: (state, action) => {},

  // [TERMINAL_ACTION.EVAL_ALL]: (state, action) => {},

  // [TERMINAL_ACTION.FOCUS_CHANGE]: (state, action) => {},
};

const terminalReducer = async (state, action) => {
  const handler = terminalReducerHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  const nextState = await handler(state, action);
  return nextState;
};

export default terminalReducer;

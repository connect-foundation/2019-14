import { TERMINAL_ACTION } from "../actions/TerminalAction";
import { utils } from "../utils";

const { deepCopy, splice } = utils;

const appendNewRepl = (prevState) => {
  const {
    inputTexts,
    isActives,
    outputTexts,
    isLoadings,
    currentText,
  } = prevState;

  const nextInputs = [...inputTexts, currentText];
  const nextActives = [...isActives, false];

  const nextOutputs = [...outputTexts, ""];
  const nextLoadings = [...isLoadings, true];

  return {
    inputTexts: nextInputs,
    isActives: nextActives,
    outputTexts: nextOutputs,
    isLoadings: nextLoadings,
  };
};

const updateRepl = (prevState) => {
  const {
    inputTexts,
    isActives,
    outputTexts,
    isLoadings,
    focusIndex,
    currentText,
  } = prevState;

  const nextInputs = splice.change(inputTexts, focusIndex, currentText);

  // 하위 terminal input cell은 재평가된다
  const leadingActives = isActives.slice(0, focusIndex);
  const followingActives = isActives.slice(focusIndex).map(() => false);
  const nextActives = leadingActives.concat(followingActives);

  const nextOutputs = splice.change(outputTexts, focusIndex, "");

  // 하위 terminal input cell이 재평가되면 output도 변한다.
  const leadingLoadings = isLoadings.slice(0, focusIndex);
  const followingLoadings = isLoadings.slice(focusIndex).map(() => true);
  const nextLoadings = leadingLoadings.concat(followingLoadings);

  return {
    inputTexts: nextInputs,
    isActives: nextActives,
    outputTexts: nextOutputs,
    isLoadings: nextLoadings,
  };
};

const terminalReducerHandler = {
  [TERMINAL_ACTION.NEW_REPL]: (state) => {
    const prevState = deepCopy(state);

    const isLastIndex = prevState.focusIndex >= prevState.replCount;
    let replCount = null;
    let nextRepls = null;
    if (isLastIndex) {
      replCount = prevState.replCount + 1;
      nextRepls = appendNewRepl(prevState);
    } else {
      replCount = prevState.replCount;
      nextRepls = updateRepl(prevState);
    }

    return {
      focusIndex: replCount,
      currentText: "",

      ...nextRepls,

      replCount,
    };
  },

  // [TERMINAL_ACTION.EVAL_INPUT]: (state, action) => {},

  // [TERMINAL_ACTION.EVAL_ALL]: (state, action) => {},

  // [TERMINAL_ACTION.FOCUS_CHANGE]: (state, action) => {},

  [TERMINAL_ACTION.CHANGE_TEXT]: (state, action) => {
    const nextState = deepCopy(state);
    nextState.currentText = action.text;
    return nextState;
  },

  [TERMINAL_ACTION.UPDATE_OUTPUT]: (state, action) => {
    const nextState = deepCopy(state);
    const { index, text } = action;

    nextState.outputTexts = splice.change(nextState.outputTexts, index, text);

    return nextState;
  },
};

const terminalReducer = (state, action) => {
  const handler = terminalReducerHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  const nextState = handler(state, action);
  return nextState;
};

export default terminalReducer;

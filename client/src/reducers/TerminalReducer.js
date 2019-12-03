import { TERMINAL_ACTION } from "../actions/TerminalAction";
import TerminalState from "./TerminalState";

const copyState = (state) => {
  return new TerminalState(state);
};

const terminalReducerHandler = {
  [TERMINAL_ACTION.NEW_TERMINAL]: (state, action) => {
    const nextState = copyState(state);
    const { cellUuid } = action;

    nextState.setIds(cellUuid);

    return nextState;
  },

  [TERMINAL_ACTION.NEW_REPL]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;
    const { focusIndex, replCount } = currentTerminal;

    const isBottomRepl = focusIndex >= replCount;
    if (isBottomRepl) {
      currentTerminal.appendNewRepl();
    } else {
      // when focus in middle or top
      currentTerminal.insertReplTo();
    }

    currentTerminal.focusBottom();

    // TODO: 다른 하위 터미널의 인풋도 다시 평가해야한다.

    return nextState;
  },

  // [TERMINAL_ACTION.EVAL_INPUT]: (state, action) => {},

  // [TERMINAL_ACTION.EVAL_ALL]: (state, action) => {},

  [TERMINAL_ACTION.FOCUS_IN]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    if (currentTerminal.replCount === 0) {
      return nextState;
    }

    currentTerminal.focusIn();

    return nextState;
  },

  [TERMINAL_ACTION.FOCUS_OUT]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    currentTerminal.insertReplTo();

    return nextState;
  },

  [TERMINAL_ACTION.FOCUS_PREV]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    const nextFocusIndex = currentTerminal.focusPrev();
    currentTerminal.replaceReplTo(nextFocusIndex);

    return nextState;
  },

  [TERMINAL_ACTION.FOCUS_NEXT]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;
    const { focusIndex } = currentTerminal;

    currentTerminal.focusNext();
    currentTerminal.replaceReplTo(focusIndex);

    return nextState;
  },

  [TERMINAL_ACTION.CHANGE_TEXT]: (state, action) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    currentTerminal.changeCurrent(action.text);

    return nextState;
  },

  [TERMINAL_ACTION.UPDATE_OUTPUT]: (state, action) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    const { index, text } = action;

    currentTerminal.updateOutput(index, text);

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

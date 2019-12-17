import createDebug from "debug";

import { TERMINAL_ACTION } from "../actions/TerminalAction";
import TerminalState from "./TerminalState";

const debug = createDebug("boost:reducer:terminal");

const copyState = (state) => {
  return new TerminalState(state);
};

const terminalReducerHandler = {
  [TERMINAL_ACTION.FOCUS_IN]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    currentTerminal.focusIn();

    return nextState;
  },

  [TERMINAL_ACTION.FOCUS_OUT]: (state) => {
    const nextState = copyState(state);

    return nextState;
  },

  [TERMINAL_ACTION.CHANGE_TEXT]: (state, action) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    currentTerminal.changeCurrentText(action.text);

    return nextState;
  },

  [TERMINAL_ACTION.UPDATE_OUTPUT]: (state, action) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    const { outputTexts } = currentTerminal;
    const { text } = action;

    if (outputTexts.length === 0) {
      // skip welcome message
      currentTerminal.updateOutput("");
    } else {
      currentTerminal.updateOutput(text);
    }

    return nextState;
  },

  [TERMINAL_ACTION.LOAD]: (state, action) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;
    const { outputTexts } = action;

    currentTerminal.outputTexts = outputTexts;

    debug("Load terminal store", nextState);

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

import createDebug from "debug";

import { TERMINAL_ACTION } from "../actions/TerminalAction";
import TerminalState from "./TerminalState";

const debug = createDebug("boost:reducer:terminal");

const copyState = (state) => {
  return new TerminalState(state);
};

const terminalReducerHandler = {
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

    return nextState;
  },

  [TERMINAL_ACTION.EVAL_ALL]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;

    currentTerminal.evalAllOutput();

    return nextState;
  },

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

  [TERMINAL_ACTION.DELETE_REPL]: (state) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;
    const { focusIndex } = currentTerminal;

    let nextFocusIndex = null;
    if (focusIndex === 0) {
      nextFocusIndex = focusIndex;
    } else {
      nextFocusIndex = currentTerminal.focusPrev();
    }
    currentTerminal.deleteRepl(nextFocusIndex);

    return nextState;
  },

  [TERMINAL_ACTION.LOAD]: (state, action) => {
    const nextState = copyState(state);
    const currentTerminal = nextState;
    const { outputString } = action;

    const nextOutputs = outputString.split("\n");

    currentTerminal.outputTexts = nextOutputs.reduce((result, output = "") => {
      const trimmed = output.trim();
      if (trimmed.length === 0) {
        return result;
      }
      result.push(`${trimmed}\n`);
      return result;
    }, []);

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

const TERMINAL_ACTION = {
  EVAL_INPUT: "terminal/eval-input",

  FOCUS_IN: "terminal/focus-in",
  FOCUS_OUT: "terminal/focus-out",

  CHANGE_TEXT: "terminal/change-text",
  UPDATE_OUTPUT: "terminal/update-output",

  DELETE_REPL: "terminal/delete-repl",

  LOAD: "terminal/load",
};

const terminalActionCreator = {
  /**
   * 터미널 쉘 명령을 평가할 수 있다.
   * @param {String} commandString REPL cell에 입력된 쉘 명령이다.
   */
  evalInput() {
    return {
      type: TERMINAL_ACTION.EVAL_INPUT,
    };
  },

  focusIn() {
    return {
      type: TERMINAL_ACTION.FOCUS_IN,
    };
  },

  focusOut() {
    return {
      type: TERMINAL_ACTION.FOCUS_OUT,
    };
  },

  /**
   * REPL 입력값을 업데이트한다.
   * @param {String} text 업데이트될 REPL의 입력값이다.
   */
  changeCurrentText(text) {
    return {
      type: TERMINAL_ACTION.CHANGE_TEXT,
      text,
    };
  },

  /**
   * REPL 출력값을 업데이트한다.
   * @param {String} text 업데이트될 REPL 출력값이다.
   */
  updateOutputText(text) {
    return {
      type: TERMINAL_ACTION.UPDATE_OUTPUT,
      text,
    };
  },

  load(outputString) {
    return {
      type: TERMINAL_ACTION.LOAD,
      outputString,
    };
  },
};

export { TERMINAL_ACTION, terminalActionCreator };

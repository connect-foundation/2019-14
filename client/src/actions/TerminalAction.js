const TERMINAL_ACTION = {
  NEW_TERMINAL: "terminal/new",

  NEW_REPL: "terminal/new-repl",
  EVAL_INPUT: "terminal/eval-input",
  EVAL_ALL: "terminal/eval-all",

  FOCUS_IN: "terminal/focus-in",
  FOCUS_PREV: "terminal/focus-prev",
  FOCUS_NEXT: "terminal/focus-next",
  FOCUS_OUT: "terminal/focus-out",

  CHANGE_TEXT: "terminal/change-text",
  CHANGE_STDIN_TEXT: "terminal/change-stdin-text",
  UPDATE_OUTPUT: "terminal/update-output",

  DELETE_REPL: "terminal/delete-repl",

  LOAD: "terminal/load",
};

const terminalActionCreator = {
  createNewTerminal(cellUuid, cellIndex) {
    return {
      type: TERMINAL_ACTION.NEW_TERMINAL,
      cellUuid,
      cellIndex,
    };
  },

  /**
   * Enter를 누를시에 사용된다.
   * 새로운 REPL cell을 현재 위치에 생성한다.
   * 마지막 위치로 포거스 된다.
   */
  createNewRepl() {
    return {
      type: TERMINAL_ACTION.NEW_REPL,
    };
  },

  /**
   * 터미널 쉘 명령을 평가할 수 있다.
   * @param {String} commandString REPL cell에 입력된 쉘 명령이다.
   */
  evalInput() {
    return {
      type: TERMINAL_ACTION.EVAL_INPUT,
    };
  },

  /**
   * 모든 터미널 쉘 명령을 평가할 수 있다.
   */
  evalAll() {
    return {
      type: TERMINAL_ACTION.EVAL_ALL,
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
   * REPL 입력 포커스를 변경한다.
   * @param {Number} to 포커스될 REPL cell index다.
   * - to === -1 이면, 제일 마지막 REPL에 포커스 된다.
   * - 클릭, 화살표 위/아래키를 누를때 동작한다.
   */
  focusPrev() {
    return {
      type: TERMINAL_ACTION.FOCUS_PREV,
    };
  },

  focusNext() {
    return {
      type: TERMINAL_ACTION.FOCUS_NEXT,
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

  changeCurrentStdin(text) {
    return {
      type: TERMINAL_ACTION.CHANGE_STDIN_TEXT,
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

  deleteRepl() {
    return {
      type: TERMINAL_ACTION.DELETE_REPL,
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

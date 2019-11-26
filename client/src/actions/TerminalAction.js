const TERMINAL_ACTION = {
  NEW_REPL: "terminal/new-repl",
  EVAL_INPUT: "terminal/eval-input",
  EVAL_ALL: "terminal/eval-all",
  FOCUS_CHANGE: "terminal/focus-change",
  CHANGE_TEXT: "terminal/change-text",
};

const terminalActionCreator = {
  /**
   * Enter를 누를시에 사용된다.
   * 새로운 REPL cell을 현재 위치에 생성한다.
   * 마지막 위치로 포거스 된다.
   * @param {Number} index index위치에 새로운 REPL cell을 위한 데이터들을 생성한다.
   * @param {String} inputText inputText 초기화값이다.
   */
  createNewRepl() {
    return {
      type: TERMINAL_ACTION.NEW_REPL,
    };
  },

  /**
   * 터미널 쉘 명령을 평가할 수 있다.
   * @param {String} commandString REPL cell에 입력된 쉘 명령이다.
   * - 엔터 이벤트를 받을때 호출된다.
   */
  evalInput(commandString) {
    return {
      type: TERMINAL_ACTION.EVAL_INPUT,
      commandString,
    };
  },

  /**
   * 모든 터미널 쉘 명령을 평가할 수 있다.
   * - 중간 REPL cell을 변경할때 호출한다.
   */
  evalAll() {
    return {
      type: TERMINAL_ACTION.EVAL_ALL,
    };
  },

  /**
   * REPL 입력 포커스를 변경한다.
   * @param {Number} to 포커스될 REPL cell index다.
   * - to === -1 이면, 제일 마지막 REPL에 포커스 된다.
   * - 클릭, 화살표 위/아래키를 누를때 동작한다.
   */
  focusChange(to) {
    return {
      type: TERMINAL_ACTION.FOCUS_CHANGE,
      to,
    };
  },

  changeCurrentText(text) {
    return {
      type: TERMINAL_ACTION.CHANGE_TEXT,
      text,
    };
  },
};

export { TERMINAL_ACTION, terminalActionCreator };

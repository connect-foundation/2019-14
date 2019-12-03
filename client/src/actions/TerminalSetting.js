const TERMINAL_SETTING_ACTION = {
  SELECT: {
    OS: "terminal-setting/select/os",
    PL: "terminal-setting/select/pl",
    DB: "terminal-setting/select/db",
  },
  MOVE: {
    PREV: "terminal-setting/move/prev",
    NEXT: "terminal-setting/move/next",
  },
};

const terminalSettingActionCreator = {
  selectOS(os) {
    return { type: TERMINAL_SETTING_ACTION.SELECT.OS, os };
  },

  selectPL() {
    return { type: TERMINAL_SETTING_ACTION.SELECT.PL };
  },

  selectDB() {
    return { type: TERMINAL_SETTING_ACTION.SELECT.DB };
  },

  prevStep(index) {
    return { type: TERMINAL_SETTING_ACTION.MOVE.PREV, index };
  },

  nextStep(index) {
    return { type: TERMINAL_SETTING_ACTION.MOVE.NEXT, index };
  },
};

export { TERMINAL_SETTING_ACTION, terminalSettingActionCreator };

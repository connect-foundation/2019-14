const TERMINAL_SETTING_ACTION = {
  SELECT: {
    OS: "terminal-setting/select/os",
    PL: "terminal-setting/select/pl",
    DB: "terminal-setting/select/db",
  },
  UNSELECT: {
    OS: "terminal-setting/unselect/os",
    PL: "terminal-setting/unselect/pl",
    DB: "terminal-setting/unselect/db",
  },
  MOVE: {
    PREV: "terminal-setting/move/prev",
    NEXT: "terminal-setting/move/next",
    STEP: "terminal-setting/move/step",
  },
  HIDE: "terminal-setting/hide",
};

const terminalSettingActionCreator = {
  selectOS(os) {
    return { type: TERMINAL_SETTING_ACTION.SELECT.OS, os };
  },

  selectPL(pl) {
    return { type: TERMINAL_SETTING_ACTION.SELECT.PL, pl };
  },

  selectDB(db) {
    return { type: TERMINAL_SETTING_ACTION.SELECT.DB, db };
  },

  prevStep(step) {
    return { type: TERMINAL_SETTING_ACTION.MOVE.PREV, step };
  },

  nextStep(step) {
    return { type: TERMINAL_SETTING_ACTION.MOVE.NEXT, step };
  },

  selectStep(step) {
    return { type: TERMINAL_SETTING_ACTION.MOVE.STEP, step };
  },

  viewTerminalSetting() {
    return { type: TERMINAL_SETTING_ACTION.HIDE };
  },
};

export { TERMINAL_SETTING_ACTION, terminalSettingActionCreator };

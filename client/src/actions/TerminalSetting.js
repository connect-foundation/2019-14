const TERMINAL_SETTING_ACTION = {
  SELECT: {
    OS: "terminal-setting/select/os",
    PL: "terminal-setting/select/pl",
    DB: "terminal-setting/select/db",
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
};

export { TERMINAL_SETTING_ACTION, terminalSettingActionCreator };

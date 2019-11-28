const TERMINAL_SETTING_ACTION = {
  OPEN: "terminal-setting/open",
  CLOSE: "terminal-setting/close",
  SELECT: "terminal-setting/select",
  UNSELECT: "terminal-setting/unselect",
};

const terminalSettingActionCreator = {
  open() {
    return {
      type: TERMINAL_SETTING_ACTION.OPEN,
    };
  },

  close() {
    return {
      type: TERMINAL_SETTING_ACTION.CLOSE,
    };
  },

  select(option) {
    return {
      type: TERMINAL_SETTING_ACTION.SELECT,
      option,
    };
  },

  unselect(option) {
    return {
      type: TERMINAL_SETTING_ACTION.UNSELECT,
      option,
    };
  },
};

export { TERMINAL_SETTING_ACTION, terminalSettingActionCreator };

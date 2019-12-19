const TERMINAL_SETTING_ACTION = {
  SELECT: {
    OS: "terminal-setting/select/os",
    PE: "terminal-setting/select/pe",
    DB: "terminal-setting/select/db",
  },
  MOVE: {
    PREV: "terminal-setting/move/prev",
    NEXT: "terminal-setting/move/next",
    STEP: "terminal-setting/move/step",
  },
  HIDE: "terminal-setting/hide",
  TERMINAL_LOADING: "terminal-setting/loading",
  CREATE_BUTTON_DISABLE: "terminal-setting/createbutton",
};

const terminalSettingActionCreator = {
  selectOS(os) {
    return { type: TERMINAL_SETTING_ACTION.SELECT.OS, os };
  },

  selectPE(pe) {
    return { type: TERMINAL_SETTING_ACTION.SELECT.PE, pe };
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
  loadTerminalLodingbar(isLoading) {
    return { type: TERMINAL_SETTING_ACTION.TERMINAL_LOADING, isLoading };
  },
  disableCreateTerminalButton(isDisable) {
    console.log(isDisable);
    return { type: TERMINAL_SETTING_ACTION.CREATE_BUTTON_DISABLE, isDisable };
  },
};

export { TERMINAL_SETTING_ACTION, terminalSettingActionCreator };

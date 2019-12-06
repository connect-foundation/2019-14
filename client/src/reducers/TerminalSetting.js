import { TERMINAL_SETTING_ACTION } from "../actions/TerminalSetting";

const terminalSettingReducer = (state, action) => {
  if (action.type === TERMINAL_SETTING_ACTION.SELECT.OS) {
    return { ...state, os: action.os };
  }

  return { state };
};

export default terminalSettingReducer;

import { TERMINAL_SETTING_ACTION } from "./../actions/TerminalSetting";

const terminalSettingHendler = {
  [TERMINAL_SETTING_ACTION.SELECT.OS]: (state, action) => {
    return { ...state, os: action.os };
  },
  [TERMINAL_SETTING_ACTION.SELECT.PL]: (state, action) => {
    return state;
  },
  [TERMINAL_SETTING_ACTION.SELECT.DB]: (state, action) => {
    return state;
  },
  [TERMINAL_SETTING_ACTION.MOVE.PREV]: (state, action) => {
    const stepperMinIndex = 1;
    if (action.index < stepperMinIndex) {
      return state;
    }
    return { ...state, currentIndex: action.index - 1 };
  },
  [TERMINAL_SETTING_ACTION.MOVE.NEXT]: (state, action) => {
    const stepperMaxIndex = 1;
    if (action.index > stepperMaxIndex) {
      return state;
    }
    return { ...state, currentIndex: action.index + 1 };
  },
};

const terminalSettingReducer = (state, action) => {
  if (!state) {
    return null;
  }

  const handler = terminalSettingHendler[action.type];

  return handler(state, action);
};

export default terminalSettingReducer;

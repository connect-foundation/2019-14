import { TERMINAL_SETTING_ACTION } from "./../actions/TerminalSetting";

const terminalSettingHendler = {
  [TERMINAL_SETTING_ACTION.SELECT.OS]: (state, action) => {
    const newOs = [];

    newOs.push(action.os);

    return { ...state, OS: newOs };
  },
  [TERMINAL_SETTING_ACTION.SELECT.PL]: (state, action) => {
    const newPL = state.PL;

    const targetIndex = newPL.findIndex((element) => element === action.pl);

    if (targetIndex < 0) newPL.push(action.pl);
    else newPL.splice(targetIndex, 1);

    return { ...state, PL: newPL };
  },
  [TERMINAL_SETTING_ACTION.SELECT.DB]: (state, action) => {
    const newDb = state.DB;

    const targetIndex = newDb.findIndex((element) => element === action.db);

    if (targetIndex < 0) newDb.push(action.db);
    else newDb.splice(targetIndex, 1);

    return { ...state, DB: newDb };
  },

  [TERMINAL_SETTING_ACTION.MOVE.PREV]: (state, action) => {
    const minStep = 1;
    if (action.step < minStep) {
      return state;
    }
    return { ...state, currentStep: action.step - 1 };
  },
  [TERMINAL_SETTING_ACTION.MOVE.NEXT]: (state, action) => {
    const maxStep = 1;
    if (action.step > maxStep) {
      return state;
    }
    return { ...state, currentStep: action.step + 1 };
  },
  [TERMINAL_SETTING_ACTION.MOVE.STEP]: (state, action) => {
    return { ...state, currentStep: action.step };
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

import { TERMINAL_SETTING_ACTION } from "./../actions/TerminalSetting";

const terminalSettingHendler = {
  [TERMINAL_SETTING_ACTION.SELECT.OS]: (state, action) => {
    // const newOs = state.OS;

    // newOs.push(action.os);
    console.log(action);
    return { ...state, OS: action.os, osInputStatus: action.osInputStatus };
  },
  [TERMINAL_SETTING_ACTION.SELECT.PL]: (state, action) => {
    const newPL = [...state.PL];

    newPL.push(action.pl);

    return { ...state, PL: newPL };
  },
  [TERMINAL_SETTING_ACTION.SELECT.DB]: (state, action) => {
    const newDb = state.DB;

    newDb.push(action.db);

    return { ...state, DB: newDb };
  },
  [TERMINAL_SETTING_ACTION.UNSELECT.OS]: (state, action) => {
    const currentOs = state.OS;

    const newOs = currentOs.filter((element) => {
      return element === action.os;
    });

    return { ...state, OS: newOs };
  },
  [TERMINAL_SETTING_ACTION.UNSELECT.PL]: (state, action) => {
    const currentPL = state.PL;

    const newPL = currentPL.filter((element) => {
      return element !== action.pl;
    });

    return { ...state, PL: newPL };
  },
  [TERMINAL_SETTING_ACTION.UNSELECT.DB]: (state, action) => {
    const newDb = state.DB;

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

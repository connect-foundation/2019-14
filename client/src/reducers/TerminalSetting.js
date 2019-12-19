import { TERMINAL_SETTING_ACTION } from "../actions/TerminalSetting";

const terminalSettingHandler = {
  [TERMINAL_SETTING_ACTION.SELECT.OS]: (state, action) => {
    const newOs = [];

    newOs.push(action.os);

    return { ...state, OS: newOs };
  },
  [TERMINAL_SETTING_ACTION.SELECT.PE]: (state, action) => {
    const newPE = [];

    state.PE.forEach((element) => {
      newPE.push(element);
    });

    const targetIndex = newPE.findIndex((element) => element === action.pe);

    if (targetIndex < 0) newPE.push(action.pe);
    else newPE.splice(targetIndex, 1);

    return { ...state, PE: newPE };
  },
  [TERMINAL_SETTING_ACTION.SELECT.DB]: (state, action) => {
    const newDb = [];

    state.DB.forEach((element) => {
      newDb.push(element);
    });

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

  [TERMINAL_SETTING_ACTION.HIDE]: (state) => {
    return { ...state, isHidden: !state.isHidden };
  },

  [TERMINAL_SETTING_ACTION.TERMINAL_LOADING]: (state, action) => {
    return { ...state, loadLodingbar: action.isLoading };
  },

  [TERMINAL_SETTING_ACTION.CREATE_BUTTON_DISABLE]: (state, action) => {
    return { ...state, createTerminalButtonDisabled: action.isDisable };
  },
};

const terminalSettingReducer = (state, action) => {
  const handler = terminalSettingHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  return handler(state, action);
};

export default terminalSettingReducer;

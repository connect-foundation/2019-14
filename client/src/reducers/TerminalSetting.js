import { TERMINAL_SETTING_ACTION } from "../actions/TerminalSetting";

const terminalSettingHendler = {
  [TERMINAL_SETTING_ACTION.SELECT.OS]: (state, action) => {
    // const newOs = state.OS;
    // newOs.push(action.os);
    // TODO isChecked 초기화 하드코딩 수정할 것
    const isChecked = [false, false];
    isChecked[action.index] = true;
    const newValue = {
      kind: action.os,
      isChecked,
    };
    return { ...state, OS: newValue };
  },
  [TERMINAL_SETTING_ACTION.SELECT.PL]: (state, action) => {
    // TODO 하드 코딩 값 변경할 것
    const defaultData = ["node", "python"];
    const newPL = {
      kind: [],
      isChecked: [...state.PL.isChecked],
    };
    // TODO 좀 더 이해하기 쉬운 코드로 바꿀 것
    newPL.isChecked[action.index] = !newPL.isChecked[action.index];
    newPL.kind = defaultData.filter((element, index) => {
      return newPL.isChecked[index];
    });

    return { ...state, PL: newPL };
  },
  [TERMINAL_SETTING_ACTION.SELECT.DB]: (state, action) => {
    const newDB = {
      kind: [action.pl],
      isChecked: [...state.DB.isChecked],
    };
    // TODO 좀 더 이해하기 쉬운 코드로 바꿀 것
    newDB.isChecked[action.index] = !newDB.isChecked[action.index];

    // TODO 하드 코딩 값 변경할 것
    const defaultData = ["mysql", "mongodb"];

    newDB.kind = defaultData.filter((element, index) => {
      return newDB.isChecked[index];
    });

    return { ...state, DB: newDB };
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
  [TERMINAL_SETTING_ACTION.HIDE]: (state, action) => {
    console.log("action");
    return { ...state, isHidden: !state.isHidden };
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

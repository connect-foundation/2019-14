import { TERMINAL_SETTING_ACTION } from "../actions/TerminalSettingAction";

const isAlreadySelected = (options, nOption) => {
  const isSameOption = (option) => option.id === nOption.id;
  return options.some(isSameOption);
};

const terminalReducerHandler = {
  [TERMINAL_SETTING_ACTION.OPEN]: (state) => {
    return {
      ...state,
      isTerminalSettingOpen: true,
    };
  },

  [TERMINAL_SETTING_ACTION.CLOSE]: (state) => {
    return {
      ...state,
      isTerminalSettingOpen: false,
    };
  },

  [TERMINAL_SETTING_ACTION.SELECT]: (state, action) => {
    const { options } = state;
    if (isAlreadySelected(options, action.option)) {
      return state;
    }
    return {
      ...state,
      options: [...options, action.option],
    };
  },

  [TERMINAL_SETTING_ACTION.UNSELECT]: (state, action) => {
    const { options } = state;
    const isNotSameOption = (option) => option.id !== action.option.id;
    const trimmedOptions = options.filter(isNotSameOption);
    return {
      ...state,
      options: trimmedOptions,
    };
  },
};

const terminalSettingReducer = (state, action) => {
  const handler = terminalReducerHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  return handler(state, action);
};

export default terminalSettingReducer;

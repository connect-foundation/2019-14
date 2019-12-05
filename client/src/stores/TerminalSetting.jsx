import React, { useReducer } from "react";
import terminalSettingReducer from "../reducers/TerminalSetting";

const TerminalSettingContext = React.createContext();
const TerminalSettingDispatch = React.createContext();

// TODO: currentIndex Step 조정
function TerminalSettingStore({ children }) {
  const initValue = {
    OS: {
      kind: [],
      isChecked: [false, false],
    },
    PL: {
      kind: [],
      isChecked: [false, false],
    },
    DB: {
      kind: [],
      isChecked: [false, false],
    },
    isHidden: false,
    currentStep: 0,
  };

  const [state, dispatch] = useReducer(terminalSettingReducer, initValue);

  return (
    <TerminalSettingContext.Provider value={{ state }}>
      <TerminalSettingDispatch.Provider value={dispatch}>
        {children}
      </TerminalSettingDispatch.Provider>
    </TerminalSettingContext.Provider>
  );
}

export {
  TerminalSettingStore,
  TerminalSettingContext,
  TerminalSettingDispatch,
};

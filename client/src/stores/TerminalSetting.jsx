import React, { useReducer } from "react";
import terminalSettingReducer from "./../reducers/TerminalSetting";

const TerminalSettingContext = React.createContext();
const TerminalSettingDispatch = React.createContext();

function TerminalSettingStore({ children }) {
  const initValue = {
    selectedOs: [],
    selectedPl: [],
    selectedDb: [],

    currentStep: "OS",
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

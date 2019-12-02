import React, { useReducer } from "react";
import terminalSettingReducer from "./../reducers/TerminalSetting";

const TerminalSettingContext = React.createContext();
const TerminalSettingDispatch = React.createContext();

function TerminalSettingStore({ children }) {
  const defaultValue = {
    OS: ["ubuntu", "centos"],
    PL: ["javascript", "python"],
    DB: ["mysql", "mongodb"],
  };

  const initvalue = {
    os: [],
    pl: [],
    db: [],
  };

  const [state, dispatch] = useReducer(terminalSettingReducer, initvalue);

  return (
    <TerminalSettingContext.Provider
      value={{ state }}
      defaultValue={defaultValue}
    >
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

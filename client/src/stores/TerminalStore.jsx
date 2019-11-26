import React from "react";
import propTypes from "prop-types";
import terminalReducer from "../reducers/TerminalReducer";
import { useReducerAsync } from "../utils";

const TerminalContext = React.createContext();
const TerminalDispatchContext = React.createContext();

const makeInitState = () => {
  return {
    focusIndex: 0,
    currentText: "",

    inputTexts: [],
    outputTexts: [],
    isLoadings: [],

    replCount: 0,
  };
};

const TerminalStore = ({ children }) => {
  const [terminalState, dispatch] = useReducerAsync(
    terminalReducer,
    makeInitState()
  );

  return (
    <TerminalContext.Provider value={{ terminalState }}>
      <TerminalDispatchContext.Provider value={dispatch}>
        {children}
      </TerminalDispatchContext.Provider>
    </TerminalContext.Provider>
  );
};

TerminalStore.defaultProps = {
  children: {},
};

TerminalStore.propTypes = {
  children: propTypes.element,
};

export { TerminalStore, TerminalContext, TerminalDispatchContext };

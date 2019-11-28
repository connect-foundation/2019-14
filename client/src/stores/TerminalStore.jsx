import React, { useReducer } from "react";
import propTypes from "prop-types";
import terminalReducer from "../reducers/TerminalReducer";

const TerminalContext = React.createContext();
const TerminalDispatchContext = React.createContext();

const makeInitState = () => {
  return {
    focusIndex: 0,
    currentText: "",

    inputTexts: [],
    isActives: [],

    outputTexts: [],
    isLoadings: [],

    replCount: 0,
  };
};

const TerminalStore = ({ children }) => {
  const [terminalState, dispatch] = useReducer(
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

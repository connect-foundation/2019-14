import React, { useReducer, useEffect } from "react";
import propTypes from "prop-types";

import { socketManager } from "../utils";
import terminalReducer from "../reducers/TerminalReducer";
import TerminalState from "../reducers/TerminalState";

const TerminalContext = React.createContext();
const TerminalDispatchContext = React.createContext();

const makeInitState = () => {
  return new TerminalState();
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

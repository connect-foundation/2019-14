import React, { useReducer } from "react";
import propTypes from "prop-types";
import terminalReducer from "../reducers/TerminalReducer";
import TerminalState from "../reducers/TerminalState";

const TerminalContext = React.createContext();
const TerminalDispatchContext = React.createContext();
let dispatchToTerminal = null;

const makeInitState = () => {
  return new TerminalState();
};

const TerminalStore = ({ children }) => {
  const [terminalState, dispatch] = useReducer(
    terminalReducer,
    makeInitState()
  );

  if (!dispatchToTerminal) {
    dispatchToTerminal = dispatch;
  }

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

export {
  TerminalStore,
  TerminalContext,
  TerminalDispatchContext,
  dispatchToTerminal,
};

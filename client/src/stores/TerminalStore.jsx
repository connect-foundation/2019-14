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

const TerminalStore = ({ cellUuid, children }) => {
  const [terminalState, dispatch] = useReducer(
    terminalReducer,
    makeInitState()
  );

  useEffect(() => {
    socketManager.enroll(cellUuid);
    return () => {
      socketManager.release(cellUuid);
    };
  }, []);

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
  cellUuid: propTypes.bool.isRequired,
  children: propTypes.element,
};

export { TerminalStore, TerminalContext, TerminalDispatchContext };

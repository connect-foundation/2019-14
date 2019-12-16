import React, { useReducer } from "react";
import propTypes from "prop-types";
import cellReducer from "../reducers/CellReducer";
import CellManager from "../reducers/CellReducerHandler/CellManager";

const CellContext = React.createContext();
const CellDispatchContext = React.createContext();

const CellStore = ({ children }) => {
  const [state, dispatch] = useReducer(cellReducer, {
    currentIndex: 0,
    inputRef: null,
    cellManager: new CellManager(),
    isLoading: false,
    clipboard: {
      texts: [],
      tags: [],
    },
    cursor: {
      start: 0,
      end: 0,
    },
    block: {
      start: null,
      end: null,
    },
    isShared: false,
  });

  return (
    <CellContext.Provider value={{ state }}>
      <CellDispatchContext.Provider value={dispatch}>
        {children}
      </CellDispatchContext.Provider>
    </CellContext.Provider>
  );
};

CellStore.defaultProps = {
  children: {},
};

CellStore.propTypes = {
  children: propTypes.element,
};

export { CellContext, CellDispatchContext, CellStore };

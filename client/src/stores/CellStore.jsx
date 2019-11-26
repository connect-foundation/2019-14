import React, { useReducer } from "react";
import propTypes from "prop-types";
import cellReducer from "../reducers/CellReducer";
import { UuidManager } from "../utils";

const CellContext = React.createContext();
const CellDispatchContext = React.createContext();

const CellStore = ({ children }) => {
  const [state, dispatch] = useReducer(cellReducer, {
    currentIndex: 0,
    inputRef: null,
    uuidManager: new UuidManager(),
    cells: [],
    texts: [],
    tags: [],
    cursor: {
      start: 0,
      end: 0,
    },
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
  children: [],
};

CellStore.propTypes = {
  children: propTypes.arrayOf(propTypes.element),
};

export { CellContext, CellDispatchContext, CellStore };

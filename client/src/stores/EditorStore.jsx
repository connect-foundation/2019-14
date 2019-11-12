import React, { useReducer } from "react";
import { editorReducer } from "../reducers/EditorReducer";

const EditorContext = React.createContext();
const EditorDispatchContext = React.createContext();

const EditorStore = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, {});

  return (
    <EditorContext.Provider value={{ state }}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorDispatchContext, EditorStore };

import React, { useContext, useEffect, useRef } from "react";
import { uuid } from "uuidv4";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import MarkdownTransformer from "./MarkdownRenderer";

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);
  const { cells } = state;
  const inputRef = useRef(null);

  useEffect(() => {
    const renderTarget = (uuid) => <MarkdownTransformer cellUuid={uuid} />;
    if (state.cells.length === 0) {
      cellDispatch(cellActionCreator.focusAttachRef(inputRef));
      cellDispatch(cellActionCreator.init(renderTarget));
    }
  }, []);

  return (
    <>
      {cells.map((cell, cellIndex) => {
        if (state.currentIndex === cellIndex) {
          return <div key={uuid()}>{cell}</div>;
        }
        return <div key={uuid()}>{cell}</div>;
      })}
    </>
  );
};

export default EditorComponent;

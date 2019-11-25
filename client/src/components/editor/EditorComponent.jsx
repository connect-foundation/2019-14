import React, { useContext, useEffect, useRef } from "react";
import { uuid } from "uuidv4";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import MarkdownCell from "./MarkdownCell";

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);
  const { cells } = state;
  const inputRef = useRef(null);

  useEffect(() => {
    const renderTargetCallback = (cellUuid) => (
      <MarkdownCell cellUuid={cellUuid} />
    );
    if (state.cells.length === 0) {
      cellDispatch(cellActionCreator.focusAttachRef(inputRef));
      cellDispatch(cellActionCreator.init(renderTargetCallback));
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

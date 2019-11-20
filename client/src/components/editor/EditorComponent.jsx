import React, { useContext, useEffect, useRef } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import MarkdownTransformer from "./MarkdownRenderer";

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);
  const { cells } = state;
  const inputRef = useRef(null);

  useEffect(() => {
    if (state.cells.length === 0) {
      cellDispatch(
        cellActionCreator.init((cellIndex, ref) => (
          <MarkdownTransformer cellIndex={cellIndex} inputRef={ref} />
        ))
      );
    }
  }, []);

  return (
    <>
      {cells.map((cell, cellIndex) => {
        if (state.currentIndex === cellIndex) {
          return <div key={`md${cellIndex}`}>{cell(cellIndex, inputRef)}</div>;
        }
        return <div key={`md${cellIndex}`}>{cell(cellIndex)}</div>;
      })}
    </>
  );
};

export default EditorComponent;

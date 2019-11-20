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
        cellActionCreator.init((ref) => <MarkdownTransformer inputRef={ref} />)
      );
    }
  }, []);

  return (
    <>
      {cells.map((cell, cellIndex) => {
        if (state.currentIndex === cellIndex) {
          return <div key={`md${cellIndex}`}>{cell(inputRef)}</div>;
        }
        return <div key={`md${cellIndex}`}>{cell()}</div>;
      })}
    </>
  );
};

export default EditorComponent;

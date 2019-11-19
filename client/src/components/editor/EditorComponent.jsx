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
      {cells.map((cell, i) => {
        if (state.currentIndex === i) {
          return <div key={`md${i}`}>{cell(inputRef)}</div>;
        }
        return <div key={`md${i}`}>{cell()}</div>;
      })}
    </>
  );
};

export default EditorComponent;

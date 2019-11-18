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
        cellActionCreator.new((callback, ref) => (
          <MarkdownTransformer callback={callback} inputRef={ref} />
        ))
      );
    }
  }, []);

  const callback = (exec) => {
    exec();
  };

  return (
    <>
      {cells.map((cell, i) => {
        if (state.currentIndex === i) {
          return <div key={`md${i}`}>{cell(callback, inputRef)}</div>;
        }
        return <div key={`md${i}`}>{cell(callback)}</div>;
      })}
    </>
  );
};

export default EditorComponent;

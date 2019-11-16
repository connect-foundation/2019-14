import React, { useContext, useEffect } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import { MarkdownTransformer } from "./MarkdownRenderer";

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);
  if (state.cells.length === 0) {
    cellDispatch(cellActionCreator.new(<MarkdownTransformer />));
  }

  useEffect(() => {
    // console.log(state);
  });

  return (
    <>
      {state.cells.length > 0
        ? state.cells.map((cell, i) => <div key={i}>{cell}</div>)
        : null}
    </>
  );
};

export default EditorComponent;

import React, { useContext } from "react";
import { CellContext } from "../../stores/CellStore";
import { MarkdownTransformer } from "./MarkdownRenderer";

const EditorComponent = () => {
  const { state } = useContext(CellContext);

  return (
    <>
      <MarkdownTransformer />
      {state.cell.length > 0
        ? state.cell.map((cell, i) => <div key={i}>{cell.component}</div>)
        : null}
    </>
  );
};

export default EditorComponent;

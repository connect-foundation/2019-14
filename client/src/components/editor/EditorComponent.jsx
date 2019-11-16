import React, { useContext } from "react";
import { CellContext } from "../../stores/CellStore";
import { MarkdownTransformer } from "./MarkdownRenderer";

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const { cells } = state;

  return (
    <>
      {cells && cells.length > 0 ? (
        cells.map((cell, i) => <MarkdownTransformer key={i} />)
      ) : (
        <MarkdownTransformer />
      )}
    </>
  );
};

export default EditorComponent;

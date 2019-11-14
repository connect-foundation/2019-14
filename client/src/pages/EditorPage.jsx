import React from "react";
import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorComponent />
      </CellStore>
    </>
  );
};

export default EditorPage;

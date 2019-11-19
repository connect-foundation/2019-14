import React from "react";

import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import Editor from "../components/editor/Editor";

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorComponent />
        <Editor />
      </CellStore>
    </>
  );
};

export default EditorPage;

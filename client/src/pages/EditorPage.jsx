import React from "react";

import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import EditorHeader from "../components/editor/header/EditorHeader";
import EditorToolbar from "../components/editor/toolbar/ToolBar";

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorHeader />
        <EditorToolbar />
        <EditorComponent />
      </CellStore>
    </>
  );
};

export default EditorPage;

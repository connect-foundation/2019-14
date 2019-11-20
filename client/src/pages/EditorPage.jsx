import React from "react";

import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import EditorHeader from "../components/editor/header/EditorHeader";
import EditorToolbar from "../components/editor/toolbar/ToolBar";
import EditorInput from "../components/editor/EditorInput";

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorHeader />
        <EditorToolbar />
        <EditorInput />
        <EditorComponent />
      </CellStore>
    </>
  );
};

export default EditorPage;

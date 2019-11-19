import React from "react";

import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import EditorInput from "../components/editor/EditorInput";

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorComponent />
        <EditorInput />
      </CellStore>
    </>
  );
};

export default EditorPage;

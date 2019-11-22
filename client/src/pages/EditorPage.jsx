import React from "react";

import styled from "styled-components";
import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import EditorHeader from "../components/editor/header/EditorHeader";
import EditorToolbar from "../components/editor/toolbar/ToolBar";
import EditorInput from "../components/editor/EditorInput";
import TerminalSetting from "../components/editor/side-window/TerminalSetting";

const EditorWindowLayout = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  height: 100vh;
`;

const MarkdownWindowLayout = styled.div`
  position: relative;

  padding: 0;

  height: 100%;

  overflow: auto;
`;

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorWindowLayout>
          <EditorHeader />
          <EditorToolbar />
          <MarkdownWindowLayout>
            <EditorInput />
            <EditorComponent />
            <TerminalSetting />
          </MarkdownWindowLayout>
        </EditorWindowLayout>
      </CellStore>
    </>
  );
};

export default EditorPage;

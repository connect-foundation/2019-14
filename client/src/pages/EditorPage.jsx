import React from "react";
import styled from "styled-components";
import { THEME } from "../enums";
import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import EditorHeader from "../components/editor/header/EditorHeader";
import EditorToolbar from "../components/editor/toolbar/ToolBar";
import TerminalSetting from "../components/editor/side-window/TerminalSetting";

const EditorWindowLayout = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  height: 100vh;

  background-color: ${THEME.DARK.THEME_COLOR_2};
`;

const MarkdownWindowLayout = styled.div`
  position: relative;

  padding: 0;

  height: 100%;

  max-height: 100%;

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
            <EditorComponent />
            <TerminalSetting />
          </MarkdownWindowLayout>
        </EditorWindowLayout>
      </CellStore>
    </>
  );
};
export default EditorPage;

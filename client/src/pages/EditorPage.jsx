import React from "react";
import styled from "styled-components";
import { THEME } from "../enums";
import { CellStore } from "../stores/CellStore";
import EditorComponent from "../components/editor/EditorComponent";
import EditorHeader from "../components/editor/header/EditorHeader";
import EditorToolbar from "../components/editor/toolbar/ToolBar";
// import TerminalSetting from "../components/editor/side-window/TerminalSetting";

const EditorWindowLayout = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  height: 100vh;

  background-color: ${THEME.DARK_TEMP.THEME_COLOR_3};
`;

const scrollStyle = `
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #de8438;
    outline: 1px solid ${THEME.DARK.THEME_COLOR_2};
  }

  body::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-button:vertical:increment {
    background: transparent;
  }

  &::-webkit-scrollbar-button:vertical:decrement {
    background: transparent;
  }
`;

const MarkdownWindowLayout = styled.div`
  position: relative;

  padding: 0;

  height: 100%;

  overflow: auto;

  ${scrollStyle}
`;

const HeaderLayout = styled.div`
  background-color: ${THEME.DARK_TEMP.THEME_COLOR_4};
`;

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <EditorWindowLayout>
          <HeaderLayout>
            <EditorHeader />
            <EditorToolbar />
          </HeaderLayout>
          <MarkdownWindowLayout>
            <EditorComponent />
          </MarkdownWindowLayout>
        </EditorWindowLayout>
      </CellStore>
    </>
  );
};
export default EditorPage;

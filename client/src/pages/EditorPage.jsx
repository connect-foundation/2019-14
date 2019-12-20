import React from "react";
import styled from "styled-components";

import EditorComponent from "../components/editor/EditorComponent";
import EditorHeader from "../components/editor/header/EditorHeader";
import EditorToolbar from "../components/editor/toolbar/ToolBar";
import TerminalSettingDrawer from "../components/editor/terminal-setting-drawers/TerminalSettingDrawer";

import { THEME } from "../enums";
import { CellStore } from "../stores/CellStore";
import { TerminalSettingStore } from "../stores/TerminalSetting";

const EditorWindowLayout = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  height: 100vh;

  overflow: hidden;

  background-color: ${THEME.VS_CODE.EDITOR};
`;

const scrollStyle = `
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #de8438;
    outline: 1px solid ${THEME.VS_CODE.EDITOR};
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
  display: flex;
  justify-content: space-between;

  position: relative;

  padding: 0;
  padding-left: 0.5em;

  width: 100%;
  height: 100%;

  overflow-y: auto;

  ${scrollStyle}
`;

const HeaderLayout = styled.div`
  background-color: ${THEME.VS_CODE.HEADER};
`;

const EditorPage = () => {
  return (
    <>
      <CellStore>
        <TerminalSettingStore>
          <EditorWindowLayout>
            <HeaderLayout>
              <EditorHeader />
              <EditorToolbar />
            </HeaderLayout>
            <MarkdownWindowLayout>
              <EditorComponent />
              <TerminalSettingDrawer />
            </MarkdownWindowLayout>
          </EditorWindowLayout>
        </TerminalSettingStore>
      </CellStore>
    </>
  );
};
export default EditorPage;

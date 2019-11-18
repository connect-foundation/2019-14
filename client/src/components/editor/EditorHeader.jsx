import React from "react";
import styled from "styled-components";
import EditorHeaderMain from "./EditorHeaderMain";
import EditorToolBar from "../header/toolbar/ToolBar";

// TODO 차후에 CSS 스타일이 고정되면 그에 맞게 수정한다.
const Header = styled.header`
  display: flex;
  flex-direction: column;
`;

/**
 * 에디터 헤더 컴포넌트
 * 헤더 메인(로고, 타이틀, 선택한 환경 아이콘들)과
 * Editor Tool Bar 컴포넌트를 import한다.
 */

const EditorHeader = () => {
  // TODO boost writer 하드 코딩값 지우기
  return (
    <Header>
      <EditorHeaderMain />
      <EditorToolBar />
    </Header>
  );
};

export default EditorHeader;

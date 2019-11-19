import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import DocumentTitleWrapper from "./DocumentTitleWrapper";
import TerminalImageContainer from "./TerminalImageList";
// TODO 차후에 CSS 스타일이 고정되면 그에 맞게 수정한다.
const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 3.75rem;
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
      <Logo />
      <DocumentTitleWrapper />
      <TerminalImageContainer />
    </Header>
  );
};

export default EditorHeader;

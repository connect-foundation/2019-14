import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import DocumentTitleWrapper from "./DocumentTitleWrapper";
import UserTerminalEnvironments from "./UserTerminalEnvironments";
// TODO 차후에 CSS 스타일이 고정되면 그에 맞게 수정한다.
const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 3.75rem;
`;

const EditorHeaderMain = () => {
  // TODO boost writer 하드 코딩값 지우기
  return (
    <Main>
      <Logo />
      <DocumentTitleWrapper />
      <UserTerminalEnvironments />
    </Main>
  );
};

export default EditorHeaderMain;

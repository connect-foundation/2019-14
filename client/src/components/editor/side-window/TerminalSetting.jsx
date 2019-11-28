import React from "react";
import styled from "styled-components";

const TERMINAL = {
  TITLE: "환경설정",
};

const TerminalSettingWrapper = styled.div`
  position: absolute;

  top: 0;
  right: 0;

  padding: 1rem;
  margin: 0;

  width: 20rem;
  height: 100%;

  border: solid black;

  background: green;
`;

const TerminalSettingTitle = styled.h1`
  padding: 0;
  margin: 0;
`;

const TerminalSetting = () => {
  return (
    <TerminalSettingWrapper>
      <TerminalSettingTitle>{TERMINAL.TITLE}</TerminalSettingTitle>
    </TerminalSettingWrapper>
  );
};

export default TerminalSetting;

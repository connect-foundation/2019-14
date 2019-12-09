import React, { useContext } from "react";
import styled from "styled-components";

import Header from "./Header";
import Contents from "./Contents";
import { TerminalSettingContext } from "../../../stores/TerminalSetting";

const TermialSettingDrawerWrapper = styled.section`
  width: 20rem;
  height: 100%;
  background-color: silver;
  top: 12.5%;

  left: ${({ isHidden }) => {
    isHidden && "9999rem";
  }};
`;

const TerminalSettingDrawer = () => {
  const { state } = useContext(TerminalSettingContext);

  return (
    <TermialSettingDrawerWrapper isHidden={state.isHidden}>
      <Header />
      <Contents />
    </TermialSettingDrawerWrapper>
  );
};

export default TerminalSettingDrawer;

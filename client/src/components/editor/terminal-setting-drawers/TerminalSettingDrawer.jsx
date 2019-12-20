import React, { useContext } from "react";
import styled from "styled-components";

import Header from "./Header";
import Contents from "./Contents";
import { TerminalSettingContext } from "../../../stores/TerminalSetting";
import { THEME } from "../../../enums";

const TermialSettingDrawerWrapper = styled.section`
  position: fixed;

  right: 0;

  width: 28rem;
  height: 100%;

  background-color: ${THEME.VS_CODE.SIDE_MENU};
  color: ${THEME.VS_CODE.FONT};
  display: ${({ isHidden }) => isHidden && "none"};
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

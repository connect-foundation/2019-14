import React, { useContext } from "react";
import styled from "styled-components";

import Header from "./Header";
import Contents from "./Contents";
import { TerminalSettingContext } from "../../../stores/TerminalSetting";

const TermialSettingDrawerWrapper = styled.section`
  width: 20rem;
  height: 100%;
  background-color: silver;
  right: 0;
  top: 12.5%;
  position: fixed;
`;

const TerminalSettingDrawer = () => {
  const { state } = useContext(TerminalSettingContext);
  if (state.isHidden) {
    return (
      <TermialSettingDrawerWrapper>
        <Header />
        <Contents />
      </TermialSettingDrawerWrapper>
    );
  }

  return <></>;
};

export default TerminalSettingDrawer;

import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Contents from "./Contents";
import { TerminalSettingStore } from "../../../stores/TerminalSetting";

const TermialSettingDrawerWrapper = styled.section`
  width: 20rem;
  height: 100%;
  background-color: silver;
`;

const TerminalSettingDrawer = () => {
  return (
    <TermialSettingDrawerWrapper>
      <Header />
      <Contents />
    </TermialSettingDrawerWrapper>
  );
};

export default TerminalSettingDrawer;

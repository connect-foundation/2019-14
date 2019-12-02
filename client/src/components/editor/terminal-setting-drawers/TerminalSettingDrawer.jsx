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
    <TerminalSettingStore>
      <TermialSettingDrawerWrapper>
        <Header />
        <Contents />
      </TermialSettingDrawerWrapper>
    </TerminalSettingStore>
  );
};

export default TerminalSettingDrawer;

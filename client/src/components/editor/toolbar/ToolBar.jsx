import React from "react";
import styled from "styled-components";

import { ToolBarButton, BUTTON_TYPE } from "./ToolBarButton";

const ToolBarWrapper = styled.nav`
  display: flex;
  width: 100%;
`;

const ToolBar = () => {
  const getToolBarButtons = () => {
    return Object.keys(BUTTON_TYPE).map((buttonType) => {
      return <ToolBarButton buttonType={buttonType} />;
    });
  };

  return <ToolBarWrapper>{getToolBarButtons()}</ToolBarWrapper>;
};

export default ToolBar;

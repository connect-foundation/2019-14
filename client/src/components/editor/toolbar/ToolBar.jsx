import React, { useContext } from "react";
import styled from "styled-components";

import { CellContext } from "../../../stores/CellStore";
import { ToolBarButton, BUTTON_TYPE } from "./ToolBarButton";

const ToolBarWrapper = styled.nav`
  display: flex;

  width: 100%;

  margin-top: 1rem;
`;

const ToolBar = () => {
  const { state } = useContext(CellContext);
  const getToolBarButtons = () => {
    if (state.isShared) return "";
    return Object.keys(BUTTON_TYPE).map((buttonType, index) => {
      const key = `toolbar-button-${index}`;
      return <ToolBarButton key={key} buttonType={buttonType} />;
    });
  };

  return <ToolBarWrapper>{getToolBarButtons()}</ToolBarWrapper>;
};

export default ToolBar;

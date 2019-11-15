import React from "react";
import styled from "styled-components";

import ToolBarButton from "./ToolBarButton";

import TYPE from "./TYPE";

const ToolBarWrapper = styled.nav`
  display: flex;
  width: 100%;
`;

const ToolBar = () => {
  const getToolBarButtons = () => {
    return Object.values(TYPE).map(type => {
      return <ToolBarButton type={type} />;
    });
  };

  return <ToolBarWrapper>{getToolBarButtons()}</ToolBarWrapper>;
};

export default ToolBar;

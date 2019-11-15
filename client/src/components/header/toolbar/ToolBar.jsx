import React from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.nav`
  display: flex;
  width: 100%;
`;

const ToolBar = () => {
  const types = ["new", "save", "load", "code", "share", "terminal"];

  return (
    <Wrapper>
      {types.map((type) => {
        return <Button type={type} />;
      })}
    </Wrapper>
  );
};

export default ToolBar;

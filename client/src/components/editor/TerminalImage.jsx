import React from "react";
import styled from "styled-components";

const TerminalImg = styled.img`
  margin-left: 1.5rem;
`;

const TerminalImage = imagePath => {
  return <TerminalImg alt="" src={imagePath} />;
};

export default TerminalImage;

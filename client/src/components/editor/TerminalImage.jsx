import React from "react";
import styled from "styled-components";

const TerminalImg = styled.img`
  margin-left: 1.5rem;
`;

const TerminalImage = (imagePath, { isDragabble } = TerminalImage.defaultProps) => {
  return <TerminalImg alt="" src={imagePath} draggable={isDragabble} />;
};

TerminalImage.defaultProps = {
  isDragabble: "false"
}

export default TerminalImage;

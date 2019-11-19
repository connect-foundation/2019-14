import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TerminalImg = styled.img`
  margin-left: 1.5rem;
`;

const TerminalImage = (
  imagePath,
  index,
  props = TerminalImage.defaultProps
) => {
  return (
    <TerminalImg
      src={imagePath}
      alt={props.terminalEnvironment}
      draggable={props.isDragabble}
      key={index}
    />
  );
};

TerminalImage.propTypes = {
  isDragabble: PropTypes.bool,
  terminalEnvironment: PropTypes.string,
};

TerminalImage.defaultProps = {
  isDragabble: false,
  terminalEnvironment: "bash",
};

export default TerminalImage;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { THEME } from "../../../../enums";

const ReplOutputWrapper = styled.div`
  height: 100%;

  padding: 15px;
  margin: 10px;

  background: ${THEME.VS_CODE.INNER_BOX};

  white-space: pre-wrap;
`;

const ReplOutput = ({ text, isLoading }) => {
  return <ReplOutputWrapper>{text}</ReplOutputWrapper>;
};

ReplOutputWrapper.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default ReplOutput;

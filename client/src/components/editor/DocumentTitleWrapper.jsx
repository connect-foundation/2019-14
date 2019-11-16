import React from "react";
import styled from "styled-components";
import DocumentTitle from "./DocumentTitle";

const DocumentTitleWrapper = styled.div`
  width: 60%;
  max-height: 10%;
  border: none;
  outline: none;
`;

const TitleWrapper = () => {
  return (
    <DocumentTitleWrapper>
      <DocumentTitle />
    </DocumentTitleWrapper>
  );
};

export default TitleWrapper;

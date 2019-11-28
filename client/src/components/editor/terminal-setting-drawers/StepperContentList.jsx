import React from "react";
import styled from "styled-components";

// TODO 임시 파일 나중에 지울것
const tempData = {
  OS: ["ubuntu", "centos", "macos"],
  PL: ["js", "java", "c"],
  DB: ["mysql", "mssql", "oracle"],
};

const StepperContentListWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StepperContentList = () => {
  const getSettings = () => {
    return Object.values(tempData.OS).map((element, index) => {
      return <li key={index}>{element}</li>;
    });
  };
  return <StepperContentListWrapper>{getSettings()}</StepperContentListWrapper>;
};

export default StepperContentList;

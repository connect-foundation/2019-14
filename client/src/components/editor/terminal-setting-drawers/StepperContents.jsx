import React from "react";
import styled from "styled-components";
// import StepperContentTitle from "./StepperContentTitle";
import StepperContentList from "./StepperContentList";

const StepperContentsWrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

const StepperContents = () => {
  return (
    <StepperContentsWrapper>
      {/* <StepperContentTitle /> */}
      <StepperContentList />
    </StepperContentsWrapper>
  );
};

export default StepperContents;

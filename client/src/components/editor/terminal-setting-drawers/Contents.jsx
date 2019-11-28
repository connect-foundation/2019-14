import React from "react";
import styled from "styled-components";
import Stepper from "./Stepper";
import StepperContents from "./StepperContents";
import StepperButtons from "./StepperButtons";

const ContentsWrapper = styled.section``;

function Contents() {
  return (
    <ContentsWrapper>
      <Stepper />
      <StepperContents />
      <StepperButtons />
    </ContentsWrapper>
  );
}

export default Contents;

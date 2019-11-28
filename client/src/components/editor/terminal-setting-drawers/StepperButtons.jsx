import React from "react";
import styled from "styled-components";

const StepperButtonsWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: ceneter;
`;

const StepperButtons = () => {
  return (
    <StepperButtonsWrapper>
      <button>prev</button>
      <button>next</button>
    </StepperButtonsWrapper>
  );
};

export default StepperButtons;

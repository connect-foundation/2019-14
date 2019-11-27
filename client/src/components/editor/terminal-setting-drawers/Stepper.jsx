import React from "react";
import styled from "styled-components";

import { Step, STEP_TYPE } from "./Step";

const StepperWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Stepper = () => {
  const getSteps = () => {
    return Object.values(STEP_TYPE).map((icon, index) => {
      return <Step icon={icon} key={index} />;
    });
  };

  return <StepperWrapper>{getSteps()}</StepperWrapper>;
};

export default Stepper;

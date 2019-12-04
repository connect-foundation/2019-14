import React, { useContext } from "react";
import styled from "styled-components";

import TERMINAL_SETTING_STEP from "../../../enums/TERMINAL_SETTING_STEP";
import StepperContent from "./StepperContent";
import { TerminalSettingContext } from "../../../stores/TerminalSetting";

const StepperContentListWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StepperContentList = () => {
  const { state } = useContext(TerminalSettingContext);

  const step = state.currentStep;

  const getSettings = () => {
    return TERMINAL_SETTING_STEP[step].list.map((element, index) => {
      return <StepperContent key={index} element={element} />;
    });
  };

  return (
    <StepperContentListWrapper>
      <h2>{TERMINAL_SETTING_STEP[step].type}</h2>
      {getSettings()}
    </StepperContentListWrapper>
  );
};

export default StepperContentList;

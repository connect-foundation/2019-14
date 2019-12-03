import React, { useContext } from "react";
import styled from "styled-components";

import TERMINAL_SETTING_LISTS from "../../../enums/TERMINAL_SETTING_LIST";
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
    return TERMINAL_SETTING_LISTS[step].map((element, index) => {
      return <li key={index}>{element}</li>;
    });
  };

  return <StepperContentListWrapper>{getSettings()}</StepperContentListWrapper>;
};

export default StepperContentList;

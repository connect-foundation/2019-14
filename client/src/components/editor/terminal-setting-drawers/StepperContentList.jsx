import React, { useContext } from "react";
import styled from "styled-components";

import TERMINAL_SETTING_STEP from "../../../enums/TERMINAL_SETTING_STEP";
import StepperContent from "./StepperContent";
import { TerminalSettingContext } from "../../../stores/TerminalSetting";

const StepperContentListWrapper = styled.ul`
  list-style-type: none;
  margin: 1rem;
`;

const StepperContentList = () => {
  const { state } = useContext(TerminalSettingContext);

  const step = state.currentStep;

  const getSettings = () => {
    return TERMINAL_SETTING_STEP[step].list.map((element, index) => {
      const newId = `setting-${index}`;
      return <StepperContent key={newId} element={element} index={index} />;
    });
  };

  return (
    <StepperContentListWrapper>
      <h3>
        {TERMINAL_SETTING_STEP[step].type === "PE"
          ? "Environment"
          : TERMINAL_SETTING_STEP[step].type}
      </h3>
      {getSettings()}
    </StepperContentListWrapper>
  );
};

export default StepperContentList;

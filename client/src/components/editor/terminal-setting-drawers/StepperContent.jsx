import React, { useContext } from "react";
import styled from "styled-components";

import {
  TerminalSettingContext,
  TerminalSettingDispatch,
} from "../../../stores/TerminalSetting";
import TERMINAL_SETTING_STEP from "../../../enums/TERMINAL_SETTING_STEP";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";

const StepperContentWrapper = styled.li``;

const StepperContent = ({ element, index }) => {
  const { state } = useContext(TerminalSettingContext);
  const dispatch = useContext(TerminalSettingDispatch);

  const type = state.currentStep ? "checkbox" : "radio";

  const onClick = () => {
    if (state.currentStep === 0) {
      dispatch(terminalSettingActionCreator.selectOS(element, index));
    } else if (state.currentStep === 1) {
      dispatch(terminalSettingActionCreator.selectPL(element, index));
    } else {
      dispatch(terminalSettingActionCreator.selectDB(element, index));
    }
  };

  return (
    <StepperContentWrapper>
      <input
        type={type}
        id={element}
        name={state.currentStep}
        onClick={onClick}
        checked={
          // TODO 변수명이 너무 김. 더 짧고 이애하기 쉬운 변수로 수정할 것
          state[TERMINAL_SETTING_STEP[state.currentStep].type].isChecked[index]
        }
      />
      <label htmlFor={element}>{element}</label>
    </StepperContentWrapper>
  );
};

export default StepperContent;

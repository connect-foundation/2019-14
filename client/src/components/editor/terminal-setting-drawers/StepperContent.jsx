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

  const isChecked = state[
    TERMINAL_SETTING_STEP[state.currentStep].type
  ].includes(element);

  const onChange = (e) => {
    if (state.currentStep === 0) {
      dispatch(terminalSettingActionCreator.selectOS(e.target.id));
    } else if (state.currentStep === 1) {
      dispatch(terminalSettingActionCreator.selectPL(e.target.id));
    } else {
      dispatch(terminalSettingActionCreator.selectDB(e.target.id));
    }
  };

  console.log(state.OS, state.PL, state.DB);

  return (
    <StepperContentWrapper>
      <input
        type={type}
        id={element}
        name={state.currentStep}
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor={element}>{element}</label>
    </StepperContentWrapper>
  );
};

export default StepperContent;

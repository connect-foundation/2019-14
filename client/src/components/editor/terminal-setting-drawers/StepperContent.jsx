import React, { useContext } from "react";
import styled from "styled-components";

import {
  TerminalSettingContext,
  TerminalSettingDispatch
} from "../../../stores/TerminalSetting";
import TERMINAL_SETTING_STEP from "../../../enums/TERMINAL_SETTING_STEP";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";

const StepperContentWrapper = styled.li``;

const StepperContent = ({ element }) => {
  const { state } = useContext(TerminalSettingContext);
  const dispatch = useContext(TerminalSettingDispatch);

  const type = state.currentStep ? "checkbox" : "radio";

  //   const isChecked = state[
  //     TERMINAL_SETTING_STEP[state.currentStep].type
  //   ].includes(element);

  //   const onClick = (ev) => {
  //     if (isChecked)
  //       dispatch(terminalSettingActionCreator.unselectPL(ev.target.textContent));
  //     else dispatch(terminalSettingActionCreator.selectPL(ev.target.textContent));
  //   };
  //  console.log(state.PL);
  console.log(state);
  const onClick = e => {
    if (state.currentStep === 0) {
      dispatch(terminalSettingActionCreator.selectOS(e.target.value));
    } else if (state.currentStep === 1) {
      dispatch(terminalSettingActionCreator.selectPL(e.target.value));
    } else {
      dispatch(terminalSettingActionCreator.selectDB(e.target.value));
    }
  };

  return (
    <StepperContentWrapper>
      <input
        type={type}
        id={element}
        name={state.currentStep}
        onClick={onClick}
        checked={state.osInputStatus}
        defaultChecked={isChecked}
      />
      <label htmlFor={element}>{element}</label>
    </StepperContentWrapper>
  );
};

export default StepperContent;

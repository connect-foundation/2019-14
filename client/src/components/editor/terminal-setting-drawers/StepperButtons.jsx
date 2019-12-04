import React, { useContext } from "react";
import styled from "styled-components";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import {
  TerminalSettingDispatch,
  TerminalSettingContext,
} from "../../../stores/TerminalSetting";

const StepperButtonsWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: ceneter;
`;

const StepperButtons = () => {
  const { state } = useContext(TerminalSettingContext);
  const dispatch = useContext(TerminalSettingDispatch);

  const clickHandler = (e) => {
    if (e.target.textContent === "prev") {
      dispatch(terminalSettingActionCreator.prevStep(state.currentStep));
    } else {
      dispatch(terminalSettingActionCreator.nextStep(state.currentStep));
    }
  };

  return (
    <StepperButtonsWrapper>
      <button onClick={clickHandler}>prev</button>
      <button onClick={clickHandler}>next</button>
    </StepperButtonsWrapper>
  );
};

export default StepperButtons;

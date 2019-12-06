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
    dispatch(terminalSettingActionCreator.selectOS("ubuntu"));
  };

  return (
    <StepperButtonsWrapper>
      <button>prev</button>
      <button onClick={clickHandler}>next</button>
    </StepperButtonsWrapper>
  );
};

export default StepperButtons;

import React, { useContext } from "react";
import styled from "styled-components";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import {
  TerminalSettingDispatch,
  TerminalSettingContext,
} from "../../../stores/TerminalSetting";
import { createTerminalFetch } from "../../../utils/Request";
import { THEME } from "../../../enums";

const StepperButtonsWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5rem;
`;

const Button = styled.button`
  background-color: ${THEME.VS_CODE.SIDE_MENU};
  color: ${THEME.VS_CODE.FONT};
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
`;

const StepperButtons = () => {
  const { state } = useContext(TerminalSettingContext);
  const dispatch = useContext(TerminalSettingDispatch);

  const clickHandler = (e) => {
    if (e.target.textContent === "< prev") {
      dispatch(terminalSettingActionCreator.prevStep(state.currentStep));
    } else {
      dispatch(terminalSettingActionCreator.nextStep(state.currentStep));
    }
  };

  const terminalButtonClickHandler = async () => {
    // TODO 함수로 분리 할 것
    const option = {
      OS: state.OS,
      PE: state.PE,
      DB: state.DB,
    };

    // TODO 받아 온 값을 store에 저장(cell, terminal)
    const result = await createTerminalFetch(option);
  };

  return (
    <StepperButtonsWrapper>
      <Button onClick={clickHandler}>&lt; prev</Button>
      <Button onClick={terminalButtonClickHandler}>createTerminal</Button>
      <Button onClick={clickHandler}>next &gt;</Button>
    </StepperButtonsWrapper>
  );
};

export default StepperButtons;

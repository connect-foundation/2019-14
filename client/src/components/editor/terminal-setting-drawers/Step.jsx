import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faUbuntu, faJs } from "@fortawesome/free-brands-svg-icons";

import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import {
  TerminalSettingDispatch,
  TerminalSettingContext,
} from "../../../stores/TerminalSetting";
import { THEME } from "../../../enums";

const STEP_TYPE = {
  OS: faUbuntu,
  ProgrammingLanguge: faJs,
  Databse: faDatabase,
};

const StepWrapper = styled.div`
  margin: 2rem 0;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  border-radius: 100%;
  background-color: ${({ isClicked }) =>
    isClicked ? THEME.VS_CODE.HEADER : THEME.VS_CODE.INNER_BOX};

  &:hover {
    background-color: ${THEME.VS_CODE.HEADER};
  }
`;

const Step = ({ icon, index }) => {
  const { state } = useContext(TerminalSettingContext);
  const dispatch = useContext(TerminalSettingDispatch);

  const clickEventHandler = () => {
    dispatch(terminalSettingActionCreator.selectStep(index));
  };

  console.log(state.currentStep === index, "??");

  return (
    <StepWrapper
      onClick={clickEventHandler}
      isClicked={state.currentStep == index}
    >
      <FontAwesomeIcon icon={icon} />
    </StepWrapper>
  );
};

export { Step, STEP_TYPE };

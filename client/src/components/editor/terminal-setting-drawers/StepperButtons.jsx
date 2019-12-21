import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createDebug from "debug";

import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import {
  TerminalSettingDispatch,
  TerminalSettingContext,
} from "../../../stores/TerminalSetting";
import { createTerminalFetch } from "../../../utils/Request";
import { THEME } from "../../../enums";
import Loading from "../../common/Loading";
import SimpleModalContentsWrapper from "../../common/SimpleModalContentsWrapper";
import { modalManager } from "../../../utils";

const debug = createDebug("boost:terminal-setting:stepper-button");

const StepperButtonsWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.5rem;
`;

const Button = styled.button`
  background-color: ${THEME.VS_CODE.INNER_BOX};
  color: ${THEME.VS_CODE.FONT};

  cursor: pointer;

  font-size: 1.2rem;

  outline: none;
  border: none;
  border-radius: 10px;

  padding: 5px 20px;
`;

const ModalContents = ({ resultmessage }) => {
  return (
    <SimpleModalContentsWrapper>
      <div>{resultmessage}</div>
    </SimpleModalContentsWrapper>
  );
};

ModalContents.propTypes = {
  resultmessage: PropTypes.string.isRequired,
};

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
    const option = {
      OS: state.OS,
      PE: state.PE,
      DB: state.DB,
    };

    let defaultCreateTerminalResultMessage = "터미널 생성에 성공하였습니다.";

    try {
      const result = await createTerminalFetch(option);

      debug("response container creation request", result);
    } catch (error) {
      debug("container creation error", error);
      defaultCreateTerminalResultMessage = "터미널 생성에 실패하였습니다.";
      // 실패 Modal 팝업
      modalManager.openModal(
        "",
        <ModalContents resultmessage={defaultCreateTerminalResultMessage} />
      );
      dispatch(terminalSettingActionCreator.loadTerminalLodingbar(false));
      return;
    }
    // 성공 Modal 팝업
    modalManager.openModal(
      "",
      <ModalContents resultmessage={defaultCreateTerminalResultMessage} />
    );
    dispatch(terminalSettingActionCreator.loadTerminalLodingbar(false));
    dispatch(terminalSettingActionCreator.viewTerminalSetting());
  };

  const waitSecond = () => {
    dispatch(terminalSettingActionCreator.disableCreateTerminalButton(true));

    terminalButtonClickHandler();

    setTimeout(() => {
      dispatch(terminalSettingActionCreator.disableCreateTerminalButton(false));
    }, 3000);
  };

  return (
    <>
      <StepperButtonsWrapper>
        <Button onClick={clickHandler}>◄</Button>
        <Button
          onClick={waitSecond}
          disabled={state.createTerminalButtonDisabled}
        >
          생성
        </Button>
        <Button onClick={clickHandler}>►</Button>
      </StepperButtonsWrapper>
      <div>{state.loadLodingbar ? <Loading /> : null}</div>
    </>
  );
};

export default StepperButtons;

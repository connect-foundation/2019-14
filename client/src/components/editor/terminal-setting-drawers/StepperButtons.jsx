import React, { useContext } from "react";
import styled from "styled-components";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import {
  TerminalSettingDispatch,
  TerminalSettingContext,
} from "../../../stores/TerminalSetting";
import { createTerminalFetch } from "../../../utils/Request";
import { THEME } from "../../../enums";
import Loading from "../../commons/Loading";
import SimpleModalContentsWrapper from "../../common/SimpleModalContentsWrapper";
import { modalManager } from "../../../utils";

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

const ModalContents = ({ resultmessage }) => {
  return (
    <SimpleModalContentsWrapper>
      <div>{resultmessage}</div>
    </SimpleModalContentsWrapper>
  );
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
    // TODO 함수로 분리 할 것
    const option = {
      OS: state.OS,
      PE: state.PE,
      DB: state.DB,
    };

    let defaultCreateTerminalResultMesage = "터미널 생성에 성공하였습니다.";

    try {
      const result = await createTerminalFetch(option);
    } catch (error) {
      console.log(error);

      defaultCreateTerminalResultMesage = "터미널 생성에 실패하였습니다.";
      modalManager.openModal(
        "",
        <ModalContents resultmessage={defaultCreateTerminalResultMesage} />
      );
      return;
    }
    // dispatch(terminalSettingActionCreator.disableCreateTerminalButton(false));
    // modal 팝업
    modalManager.openModal(
      "",
      <ModalContents resultmessage={defaultCreateTerminalResultMesage} />
    );
  };

  const waitSecond = () => {
    dispatch(terminalSettingActionCreator.loadTerminalLodingbar(true));
    dispatch(terminalSettingActionCreator.disableCreateTerminalButton(true));

    setTimeout(() => {
      terminalButtonClickHandler();
      dispatch(terminalSettingActionCreator.loadTerminalLodingbar(false));
      dispatch(terminalSettingActionCreator.disableCreateTerminalButton(false));
    }, 3000);
  };

  return (
    <>
      <StepperButtonsWrapper>
        <Button onClick={clickHandler}>&lt; prev</Button>
        <Button
          onClick={waitSecond}
          disabled={state.createTerminalButtonDisabled}
        >
          createTerminal
        </Button>
        <Button onClick={clickHandler}>next &gt;</Button>
      </StepperButtonsWrapper>
      <div>{state.loadLodingbar ? <Loading /> : null}</div>
    </>
  );
};

export default StepperButtons;

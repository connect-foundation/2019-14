import React, { useContext } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faFileDownload,
  faFileUpload,
  faFileCode,
  faFileExport,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { CellDispatchContext } from "../../../stores/CellStore";
import { THEME } from "../../../enums";
import { cellActionCreator } from "../../../actions/CellAction";
import { TerminalSettingDispatch } from "../../../stores/TerminalSetting";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";

const BUTTON_TYPE = {
  NEW: faFileMedical,
  SAVE: faFileDownload,
  LOAD: faFileUpload,
  CODE: faFileCode,
  SHARE: faFileExport,
  TERMINAL: faTerminal,
};

const BUTTON_HANDLER = {
  NEW: () => {},
  SAVE: (cellDispatch) => {
    cellDispatch(cellActionCreator.save());
  },
  LOAD: (cellDispatch) => {
    cellDispatch(cellActionCreator.load());
  },
  CODE: () => {},
  SHARE: () => {},
  TERMINAL: () => {},
};

const ToolBarButtonWrapper = styled.button`
  margin: 0 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  background: transparent;
  border: transparent;
  cursor: pointer;
  color: ${THEME.VS_CODE.FONT};

  margin-left: ${({ isTerminal }) => isTerminal && "auto"};
`;

const ToolBarButton = ({ buttonType }) => {
  const isTerminal = buttonType === "TERMINAL";
  const cellDispatch = useContext(CellDispatchContext);

  const onClick = () => {
    BUTTON_HANDLER[buttonType](cellDispatch);
  };

  if (isTerminal) {
    const dispatch = useContext(TerminalSettingDispatch);

    const handler = () => {
      dispatch(terminalSettingActionCreator.hideTerminalSettingView());
    };

    return (
      <ToolBarButtonWrapper type={buttonType} onClick={handler}>
        <FontAwesomeIcon icon={BUTTON_TYPE[buttonType]} />
      </ToolBarButtonWrapper>
    );
  }

  return (
    <ToolBarButtonWrapper isTerminal={isTerminal}>
      <FontAwesomeIcon icon={BUTTON_TYPE[buttonType]} onClick={onClick} />
    </ToolBarButtonWrapper>
  );
};

ToolBarButton.propTypes = {
  buttonType: propTypes.string.isRequired,
};

export { ToolBarButton, BUTTON_TYPE };

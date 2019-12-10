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
import { CellDispatchContext, CellContext } from "../../../stores/CellStore";
import { THEME } from "../../../enums";
import { cellActionCreator } from "../../../actions/CellAction";
import { TerminalSettingDispatch } from "../../../stores/TerminalSetting";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import { request } from "../../../utils";

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
  LOAD: (cellDispatch, cellManager) => {
    const loadDocument = async () => {
      const result = await request.do("LOAD");
      const doc = await result.text();
      cellManager.load(doc);
      cellDispatch(cellActionCreator.loadFinish());
    };
    cellDispatch(cellActionCreator.load());
    loadDocument();
  },
  CODE: () => {},
  SHARE: () => {},
  TERMINAL: (tmp, temp, terminalDispatch) => {
    terminalDispatch(terminalSettingActionCreator.viewTerminalSetting());
  },
};

const ToolBarButtonWrapper = styled.button`
  margin: 0 0.5rem;
  width: 2rem;
  height: 3rem;
  font-size: 1.5rem;
  background: transparent;
  border: transparent;
  cursor: pointer;
  color: ${THEME.VS_CODE.FONT};

  div {
    font-size: 0.4rem;
  }

  margin-left: ${({ isTerminal }) => isTerminal && "auto"};
`;

const ToolBarButton = ({ buttonType }) => {
  const isTerminal = buttonType === "TERMINAL";
  const cellDispatch = useContext(CellDispatchContext);
  const terminalDispatch = useContext(TerminalSettingDispatch);
  const { state } = useContext(CellContext);
  const { cellManager } = state;

  const onClick = () => {
    BUTTON_HANDLER[buttonType](cellDispatch, cellManager, terminalDispatch);
  };

  return (
    <ToolBarButtonWrapper isTerminal={isTerminal}>
      <FontAwesomeIcon icon={BUTTON_TYPE[buttonType]} onClick={onClick} />
      <div>{buttonType}</div>
    </ToolBarButtonWrapper>
  );
};

ToolBarButton.propTypes = {
  buttonType: propTypes.string.isRequired,
};

export { ToolBarButton, BUTTON_TYPE };

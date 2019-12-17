import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faFileDownload,
  faFileUpload,
  faFileExport,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { terminalSettingActionCreator } from "../../../actions/TerminalSetting";
import { TerminalSettingDispatch } from "../../../stores/TerminalSetting";
import { CellDispatchContext, CellContext } from "../../../stores/CellStore";
import { THEME } from "../../../enums";
import { cellActionCreator } from "../../../actions/CellAction";
import { request, utils } from "../../../utils";

const BUTTON_TYPE = {
  NEW: faFileMedical,
  SAVE: faFileDownload,
  LOAD: faFileUpload,
  SHARE: faFileExport,
  TERMINAL: faTerminal,
};

const share = async () => {
  const containerId = 9;
  const response = await request.shareDocument(containerId);
  /**
   * @todo 에러 처리하기
   * - 성공, 실패시 각각 처리할 것.
   */
  if (response.status === 500) {
    return false;
  }
  const shareId = response.data;
  localStorage.setItem("sharedDocumentId", shareId);
  return shareId;
};

const BUTTON_HANDLER = {
  NEW: () => {},
  SAVE: (cellDispatch) => {
    cellDispatch(cellActionCreator.save());
  },
  LOAD: (cellDispatch, cellManager) => {
    const loadDocument = async () => {
      /**
       * @todo static한거 바꾸기
       * - 터미널 생성한 정보 받아서 바꾸기
       */
      const containerId = 9;
      const response = await request.loadDocument(containerId);
      console.log(response);
      /**
       * @todo 에러 처리하기
       * - 성공, 실패시 각각 처리할 것.
       */
      const document = response.data;
      cellManager.load(document);
      cellDispatch(cellActionCreator.loadFinish());
    };
    cellDispatch(cellActionCreator.load());
    loadDocument();
  },
  SHARE: () => {
    let shareId = null;
    const shareDocument = async () => {
      shareId = await share();
      utils.copyText(shareId);
    };

    shareId = localStorage.getItem("sharedDocumentId");
    if (shareId) {
      utils.copyText(shareId);
    } else {
      shareDocument();
    }
  },
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
  const { cellManager, isShared } = state;

  const onClick = () => {
    BUTTON_HANDLER[buttonType](cellDispatch, cellManager, terminalDispatch);
  };

  useEffect(() => {
    if (isShared) {
      console.log(localStorage.getItem("sharedDocumentId"));
    }
  }, [isShared]);

  return (
    <ToolBarButtonWrapper isTerminal={isTerminal}>
      {/* {isShared && <Redirect to="/share" />} */}
      <FontAwesomeIcon icon={BUTTON_TYPE[buttonType]} onClick={onClick} />
      <div>{buttonType}</div>
    </ToolBarButtonWrapper>
  );
};

ToolBarButton.propTypes = {
  buttonType: propTypes.string.isRequired,
};

export { ToolBarButton, BUTTON_TYPE };

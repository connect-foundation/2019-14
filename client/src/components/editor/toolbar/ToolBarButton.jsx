import React, { useContext } from "react";
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
import { request, utils, modalManager } from "../../../utils";
import SimpleModalContentsWrapper from "../../common/SimpleModalContentsWrapper";

const { openModal } = modalManager;

const BUTTON_TYPE = {
  NEW: faFileMedical,
  SAVE: faFileDownload,
  LOAD: faFileUpload,
  SHARE: faFileExport,
  TERMINAL: faTerminal,
};

const openShareSuccessModal = () => {
  const label = "공유 성공";
  const modalContents = (
    <SimpleModalContentsWrapper>
      <div>공유에 성공하였습니다.</div>
      <div>공유를 위한 UUID가 클립보드에 복사되었습니다.</div>
    </SimpleModalContentsWrapper>
  );
  openModal(label, modalContents);
};

const openShareFailModal = () => {
  const label = "공유 실패";
  const modalContents = (
    <SimpleModalContentsWrapper>
      <div>공유에 실패하였습니다.</div>
      <div>다시 시도해 주세요.</div>
    </SimpleModalContentsWrapper>
  );
  openModal(label, modalContents);
};

const openLoadFailModal = () => {
  const label = "불러오기 실패";
  const modalContents = (
    <SimpleModalContentsWrapper>
      <div>불러오기에 실패하였습니다.</div>
      <div>다시 시도해 주세요.</div>
    </SimpleModalContentsWrapper>
  );
  openModal(label, modalContents);
};

const share = async () => {
  const containerId = 9;
  const response = await request.shareDocument(containerId);
  if (response.status === 500) {
    openShareFailModal();
    return false;
  }
  const shareId = response.data;
  localStorage.setItem("sharedDocumentId", shareId);
  openShareSuccessModal();
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
      if (response.status === 200) {
        const document = response.data;
        cellManager.load(document);
        cellDispatch(cellActionCreator.loadFinish());
      } else {
        openLoadFailModal();
      }
    };
    cellDispatch(cellActionCreator.load());
    loadDocument();
  },
  SHARE: () => {
    let shareId = null;
    const shareDocument = async () => {
      shareId = await share();
      if (shareId) {
        utils.copyText(shareId);
      }
    };

    shareId = localStorage.getItem("sharedDocumentId");
    if (shareId) {
      utils.copyText(shareId);
      openShareSuccessModal();
    } else {
      shareDocument();
    }
  },
  TERMINAL: (tmp, temp, terminalDispatch) => {
    terminalDispatch(terminalSettingActionCreator.viewTerminalSetting());
  },
};

const ToolBarButtonWrapper = styled.button`
  height: 3rem;

  border: none;
  outline: none;

  background: transparent;

  color: ${THEME.VS_CODE.FONT};
  outline: none;

  cursor: pointer;

  font-size: 1.5rem;
  div {
    font-size: 0.7rem;
  }

  margin: 0 0.5rem;
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
    <ToolBarButtonWrapper isTerminal={isTerminal} onClick={onClick}>
      <FontAwesomeIcon icon={BUTTON_TYPE[buttonType]} />
      <div>{buttonType}</div>
    </ToolBarButtonWrapper>
  );
};

ToolBarButton.propTypes = {
  buttonType: propTypes.string.isRequired,
};

export { ToolBarButton, BUTTON_TYPE };

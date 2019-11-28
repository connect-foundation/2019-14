import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faFileDownload,
  faFileUpload,
  faFileCode,
  faFileExport,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { THEME } from "../../../enums";

const BUTTON_TYPE = {
  NEW: faFileMedical,
  SAVE: faFileDownload,
  LOAD: faFileUpload,
  CODE: faFileCode,
  SHARE: faFileExport,
  TERMINAL: faTerminal,
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

  margin-left: ${(props) => (props.isTerminal ? "auto" : "0px")};
`;

const ToolBarButton = ({ buttonType }) => {
  const isTerminal = buttonType === "TERMINAL";

  return (
    <ToolBarButtonWrapper isTerminal={isTerminal}>
      <FontAwesomeIcon icon={BUTTON_TYPE[buttonType]} />
    </ToolBarButtonWrapper>
  );
};

export { ToolBarButton, BUTTON_TYPE };

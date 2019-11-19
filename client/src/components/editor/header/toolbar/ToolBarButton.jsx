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

import TYPE from "./TYPE";

const ToolBarButtonWrapper = styled.button`
  margin: 0 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  background: transparent;
  border: transparent;
  cursor: pointer;

  margin-left: ${(props) => (props.type === "terminal" ? "auto" : "0px")};
`;

const ToolBarButton = ({ type }) => {
  const ICON = {
    [TYPE.NEW]: faFileMedical,
    [TYPE.SAVE]: faFileDownload,
    [TYPE.LOAD]: faFileUpload,
    [TYPE.CODE]: faFileCode,
    [TYPE.SHARE]: faFileExport,
    [TYPE.TERMINAL]: faTerminal,
  };

  return (
    <ToolBarButtonWrapper type={type}>
      <FontAwesomeIcon icon={ICON[type]} />
    </ToolBarButtonWrapper>
  );
};

export default ToolBarButton;

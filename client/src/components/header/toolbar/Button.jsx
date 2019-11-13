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

const Wrapper = styled.button`
  margin: 0 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  background: transparent;
  border: transparent;
  cursor: pointer;

  margin-left: ${(props) => (props.terminal ? "auto" : "0px")};
`;

const Button = ({ type }) => {
  let icon = "";

  switch (type) {
    case "new":
      icon = faFileMedical;
      break;
    case "save":
      icon = faFileDownload;
      break;
    case "load":
      icon = faFileUpload;
      break;
    case "code":
      icon = faFileCode;
      break;
    case "share":
      icon = faFileExport;
      break;
    default:
      icon = faTerminal;
      break;
  }

  if (icon === faTerminal) {
    return (
      <Wrapper terminal>
        <FontAwesomeIcon icon={icon} />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <FontAwesomeIcon icon={icon} />
      </Wrapper>
    );
  }
};

export default Button;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faFileDownload,
  faFileUpload,
  faFileCode,
  faFileExport,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

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

  return (
    <>
      <FontAwesomeIcon icon={icon} />
    </>
  );
};

export default Button;

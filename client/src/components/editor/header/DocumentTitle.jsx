import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useKey } from "../../../utils";
import EVENT_TYPE from "../../../enums/EVENT_TYPE";

const DocumentTitleInput = styled.input`
  padding: 0 1rem;
  background-color: transparent;
  font-size: 2rem;
  width: 100%;
  border: none;
  overflow: hidden;
  color: #ffffff;
  font-weight: bold;
  line-height: 2;

  &:focus {
    border: none;
    outline: none;
  }
  &:hover {
    cursor: text;
  }
}
`;

const DocumentTitle = (props) => {
  const [state, setState] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const onInputHandler = (e) => {
    const documentTitle = e.currentTarget.textContent;
    setState(documentTitle);
  };

  const onClickHandler = () => {
    setIsFocus(true);
  };

  const onBlurHandler = () => {
    setIsFocus(false);
  };

  // TODO: isFocus is required for useKey
  // HandlerManager.initHandler();
  // HandlerManager.setHandler(EVENT_TYPE.ENTER, onClickHandler);
  // HandlerManager.setWindowKeydownEvent();

  return (
    <DocumentTitleInput
      placeholder="제목 없는 문서"
      contentEditable={props.contentEditable}
      onInput={onInputHandler}
      data-text={props.defaultText}
      onClick={onClickHandler}
      onBlur={onBlurHandler}
    />
  );
};

DocumentTitle.propTypes = {
  contentEditable: PropTypes.bool,
  defaultText: PropTypes.string,
};

export default DocumentTitle;

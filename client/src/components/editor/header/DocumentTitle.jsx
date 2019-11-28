import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DocumentTitleInput = styled.h1`
  display: inline-block;
  padding: 0 1rem 0 1rem;
  background-color: transparent;
  font-size: 1.5rem;
  max-width: 100%;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  color: #ffffff;
  font-weight: bold;
  line-height: 2;

  :focus {
    // prev border color rgb(43, 125, 233)
    border: 0.125rem solid #A3A1A1;
    border-radius: 0.25rem;
  }

  &:empty {
    &::before {
      content: attr(data-text);
      color: silver;
    }
  }
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: text;
  }
}
`;

const DocumentTitle = (props) => {
  const [state, setState] = useState("");

  const onInputHandler = (e) => {
    const documentTitle = e.currentTarget.textContent;
    setState(documentTitle);
  };

  return (
    <DocumentTitleInput
      contentEditable={props.contentEditable}
      onInput={onInputHandler}
      data-text={props.defaultText}
    />
  );
};

DocumentTitle.propTypes = {
  contentEditable: PropTypes.bool,
  defaultText: PropTypes.string,
};

DocumentTitle.defaultProps = {
  contentEditable: true,
  defaultText: "제목 없는 문서",
};

export default DocumentTitle;

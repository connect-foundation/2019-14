import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const DocumentTitleInput = styled.div`
  display: inline-block;
  padding: 1rem;
  background-color: #ffffff;
  font-size: 1.125rem;
  max-width: 100%;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;

  :focus {
    border: 0.125rem solid rgb(43, 125, 233);
    border-radius: 0.25rem;
  }

  :empty:not(:focus):before {
    content:attr(data-text);
    color: gray;
  }
}
`;

const DocumentTitle = (props) => {
  const [state, setState] = useState("");

  const onInputHandler = e => {
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
}

DocumentTitle.defaultProps = {
  contentEditable: true,
  defaultText: "제목 없는 문서",
};

export default DocumentTitle;

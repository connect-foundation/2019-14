import React, { useState } from "react";
import styled from "styled-components";

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

const DocumentTitle = () => {
  const defaultTitle = "제목 없는 문서";
  const [state, setState] = useState("");

  const onInputHandler = e => {
    const documentTitle = e.currentTarget.value;
    setState(documentTitle);
  };

  return (
    <DocumentTitleInput
      contentEditable="true"
      placeholder={defaultTitle}
      defaultValue={state}
      onInput={onInputHandler}
      data-text={defaultTitle}
    />
  );
};

export default DocumentTitle;

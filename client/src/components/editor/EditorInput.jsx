import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getType } from "../../utils/index";

const PLACEHOLDER = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",

  ul: "Unordered List",

  ol: "Ordered List",

  blockquote: "Quote",

  pre: "Code",
};

const MarkdownWrapper = styled.div`
  border: none;

  &:empty {
    &::before {
      content: attr(placeholder);
      color: silver;
    }
  }
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: text;
  }

  border-left: ${(props) => (props.isQuote ? "0.25rem solid silver" : null)};
  padding-left: ${(props) => (props.isQuote ? "0.5rem" : null)};
`;

const EditorInput = () => {
  const [state, setState] = useState({
    value: "",
    type: "",
    placeholder: "",
    start: 1,
  });

  const inputRef = React.createRef();

  const onInput = (ev) => {
    setState({ ...state, value: ev.target.textContent });
  };

  useEffect(() => {
    const type = getType(state.value);
    const placeholder = PLACEHOLDER[type];

    if (!state.type) {
      setState({
        ...state,
        type: type,
        placeholder: placeholder,
      });
    }
  }, [state.value]);

  useEffect(() => {
    let start = 1;

    if (state.type === "ol") start = parseInt(state.value.replace(".", ""));

    setState({ ...state, value: state.value, start: start });
  }, [state.type]);

  const onKeyPress = (ev) => {
    const { key } = ev;

    switch (key) {
      case " ":
        break;
      case "Enter":
        break;
    }
  };

  const isUnorderedList = state.type === "ul";
  const isOrderedList = state.type === "ol";
  const isQuote = state.type === "blockquote";
  const isCode = state.type === "code";
  const isHorizontalRule = state.type === "hr";

  let renderTarget = (
    <MarkdownWrapper
      as={state.type}
      isQuote={isQuote}
      placeholder={state.placeholder}
      contentEditable={true}
      onInput={onInput}
      onKeyPress={onKeyPress}
      ref={inputRef}
    />
  );

  if (isUnorderedList) {
    renderTarget = (
      <MarkdownWrapper as={state.type}>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
          ref={inputRef}
        />
      </MarkdownWrapper>
    );
  }

  if (isOrderedList) {
    renderTarget = (
      <MarkdownWrapper as={state.type} start={state.start}>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
          ref={inputRef}
        />
      </MarkdownWrapper>
    );
  }

  if (isCode) {
    renderTarget = (
      <MarkdownWrapper as={state.type}>
        <MarkdownWrapper
          as="code"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
          ref={inputRef}
        />
      </MarkdownWrapper>
    );
  }

  return renderTarget;
};

export default EditorInput;

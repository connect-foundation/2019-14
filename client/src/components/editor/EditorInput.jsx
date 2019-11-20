import React, { useState } from "react";
import styled from "styled-components";

const stateAttr = {
  "#": { type: "h1", placeholder: "Heading 1" },
  "##": { type: "h2", placeholder: "Heading 2" },
  "###": { type: "h3", placeholder: "Heading 3" },
  "####": { type: "h4", placeholder: "Heading 4" },
  "#####": { type: "h5", placeholder: "Heading 5" },
  "######": { type: "h6", placeholder: "Heading 6" },

  "-": { type: "ul", placeholder: "Unordered List" },
  "*": { type: "ul", placeholder: "Unordered List" },
  "+": { type: "ul", placeholder: "Unordered List" },

  "1.": { type: "ol", placeholder: "Ordered List" },

  ">": { type: "blockquote", placeholder: "Quote" },
};

const MarkdownWrapper = styled.input`
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
  });

  const onInput = (ev) => {
    setState({ ...state, value: ev.target.value });
  };

  const onKeyPress = (ev) => {
    const { key } = ev;

    if (key === " ") {
      if (!state.type) setState({ ...state, ...stateAttr[state.value] });
    }
  };

  const isList = state.type === "ul" || state.type === "ol";
  const isQuote = state.type === "blockquote";

  let renderTarget = (
    <MarkdownWrapper
      as={state.type}
      isQuote={isQuote}
      placeholder={state.placeholder}
      contentEditable={true}
      onInput={onInput}
      onKeyPress={onKeyPress}
    />
  );

  if (isList) {
    renderTarget = (
      <MarkdownWrapper as={state.type}>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </MarkdownWrapper>
    );
  }

  return renderTarget;
};

export default EditorInput;

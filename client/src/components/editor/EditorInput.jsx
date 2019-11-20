import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

  border-left: ${(props) => (props.isQuote ? "0.4rem solid silver" : "none")};

  padding-left: ${(props) => (props.isQuote ? "0.8rem" : "0")};
`;

const EditorInput = () => {
  const [state, setState] = useState({
    value: "",
    type: "",
    placeholder: "",
  });

  const STATE = {
    "#": { ...state, type: "h1", placeholder: "Heading 1" },
    "##": { ...state, type: "h2", placeholder: "Heading 2" },
    "###": { ...state, type: "h3", placeholder: "Heading 3" },
    "####": { ...state, type: "h4", placeholder: "Heading 4" },
    "#####": { ...state, type: "h5", placeholder: "Heading 5" },
    "######": { ...state, type: "h6", placeholder: "Heading 6" },

    "-": { ...state, type: "ul", placeholder: "Unordered List" },
    "*": { ...state, type: "ul", placeholder: "Unordered List" },
    "+": { ...state, type: "ul", placeholder: "Unordered List" },

    "1.": { ...state, type: "ol", placeholder: "Ordered List" },

    ">": { ...state, type: "blockquote", placeholder: "Quote" },
  };

  const onInput = (ev) => {
    setState({ ...state, value: ev.target.value });
  };

  const onKeyPress = (ev) => {
    const { key } = ev;

    if (key === " ") {
      if (!state.type) {
        setState(STATE[state.value]);
      }
    }
  };

  const isQuote = state.type === "blockquote";

  if (state.type === "ul" || state.type === "ol") {
    return (
      <MarkdownWrapper as={state.type} is>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </MarkdownWrapper>
    );
  } else {
    return (
      <MarkdownWrapper
        as={state.type}
        isQuote={isQuote}
        placeholder={state.placeholder}
        contentEditable={true}
        onInput={onInput}
        onKeyPress={onKeyPress}
      />
    );
  }
};

export default EditorInput;

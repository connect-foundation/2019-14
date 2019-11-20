import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

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

  border-left: ${(props) => {
    if (props.isQuote) return "0.25rem solid silver";
  }}
  padding-left: ${(props) => {
    if (props.isQuote) return "0.5rem";
  }};
`;

const EditorInput = ({ onKeyDown, onFocus, inputRef, cellIndex }) => {
  const [state, setState] = useState({
    value: "",
    type: "",
    placeholder: "",
  });

  const cellContext = useContext(CellContext);
  const cellState = cellContext.state;
  // console.log(cellState);
  // console.log(cellState.texts);

  const cellDispatch = useContext(CellDispatchContext);
  const onInput = (ev) => {
    const { textContent } = ev.target;
    cellDispatch(cellActionCreator.input(textContent));
    setState({
      ...state,
      value: cellState.texts[cellIndex],
    });
  };

  const onKeyPress = (ev) => {
    const { key } = ev;
    console.log(
      "1234",
      state.type,
      "/",
      state.value,
      "/",
      stateAttr[state.value]
    );

    if (key === " ") {
      if (!state.type) setState({ ...state, ...stateAttr[state.value] });
    }
  };

  const isQuote = state.type === "blockquote";

  if (state.type === "ul" || state.type === "ol") {
    return (
      <MarkdownWrapper as={state.type}>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable
          onInput={onInput}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          ref={inputRef || null}
        />
      </MarkdownWrapper>
    );
  }
  return (
    <MarkdownWrapper
      as={state.type}
      isQuote={isQuote}
      placeholder={state.placeholder}
      contentEditable
      onInput={onInput}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      ref={inputRef || null}
    />
  );
};

export default EditorInput;

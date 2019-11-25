import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getType } from "../../utils/index";

const EditorInput = () => {
  const [state, setState] = useState({
    value: "",
    type: "",
    placeholder: "",
    start: 1,
  });

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
    />
  );

  if (isUnorderedList) {
    renderTarget = (
      <ul>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </ul>
    );
  }

  if (isOrderedList) {
    renderTarget = (
      <ol start={state.start}>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </ol>
    );
  }

  if (isCode) {
    renderTarget = (
      <pre>
        <MarkdownWrapper
          as={state.type}
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </pre>
    );
  }

  if (isHorizontalRule) {
    renderTarget = <hr noshade="noshade" style={{ borderColor: "silver" }} />;
  }

  return renderTarget;
};

export default EditorInput;

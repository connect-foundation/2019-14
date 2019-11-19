import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MARKDOWN_TYPE = {
  "": styled.div`
    &:focus {
      outline: none;
    }
  `,

  h1: styled.h1`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,
  h2: styled.h2`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,
  h3: styled.h3`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,
  h4: styled.h4`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,
  h5: styled.h5`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,
  h6: styled.h6`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,

  li: styled.li`
    &:empty {
      &::before {
        content: attr(placeholder);
        color: gray;
      }
    }

    &:focus {
      outline: none;
    }
  `,
};

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

    "-": { ...state, type: "li", placeholder: "list" },
    "*": { ...state, type: "li", placeholder: "list" },
    "+": { ...state, type: "li", placeholder: "list" },
  };

  const onInput = (ev) => {
    setState({ ...state, value: ev.target.textContent });
  };
  const onKeyPress = (ev) => {
    const { key } = ev;

    if (!state.type && key === " ") {
      setState(STATE[state.value]);
    }
  };

  const MarkdownWrapper = MARKDOWN_TYPE[state.type];

  return (
    <MarkdownWrapper
      placeholder={state.placeholder}
      contentEditable={true}
      onInput={onInput}
      onKeyPress={onKeyPress}
    />
  );
};

export default EditorInput;

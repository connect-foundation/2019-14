import React, { useState } from "react";
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

  ul: styled.li`
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

  ol: styled.li`
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

  blockquote: styled.blockquote`
    border-left: 0.25rem solid silver;
    padding-left: 1rem;

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

    "-": { ...state, type: "ul", placeholder: "list" },
    "*": { ...state, type: "ul", placeholder: "list" },
    "+": { ...state, type: "ul", placeholder: "list" },

    "1.": { ...state, type: "ol", placeholder: "list" },

    ">": { ...state, type: "blockquote", placeholder: "quote" },
  };

  const onInput = (ev) => {
    setState({ ...state, value: ev.target.textContent });
  };

  const onKeyPress = (ev) => {
    const { key } = ev;

    if (key === " ") {
      if (!state.type) {
        setState(STATE[state.value]);
      }
    }
  };

  const MarkdownWrapper = MARKDOWN_TYPE[state.type];

  if (state.type === "ul") {
    return (
      <ul>
        <MarkdownWrapper
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </ul>
    );
  } else if (state.type === "ol") {
    return (
      <ol>
        <MarkdownWrapper
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </ol>
    );
  } else {
    return (
      <MarkdownWrapper
        placeholder={state.placeholder}
        contentEditable={true}
        onInput={onInput}
        onKeyPress={onKeyPress}
      />
    );
  }
};

export default EditorInput;

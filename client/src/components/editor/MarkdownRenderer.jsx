import React, { useEffect, useReducer } from "react";

const MARKDOWN_ACTION = {
  INIT: "markdown/init",
  TRANSFORM: "markdown/transform",
  INPUT: "markdown/input",
};

const markdownReducer = (state, action) => {
  switch (action.type) {
    case MARKDOWN_ACTION.INIT:
      return {
        text: action.text || "",
        renderTarget: action.renderTarget || null,
      };
    case MARKDOWN_ACTION.INPUT:
      return {
        ...state,
        text: action.text,
      };
    case MARKDOWN_ACTION.TRANSFORM:
      return {
        ...state,
        renderTarget: action.renderTarget,
      };
  }
  return state;
};

const HComponent = () => {
  return <div>hello h component!</div>;
};

const MarkdownDefaultInput = ({ markdownDispatch }) => {
  const inputHandler = e => {
    const text = e.target.value;
    markdownDispatch({ type: MARKDOWN_ACTION.INPUT, text });
  };

  return (
    <div>
      <input type="text" onInput={inputHandler} />
    </div>
  );
};

const MarkdownTransformer = () => {
  const [markdown, markdownDispatch] = useReducer(markdownReducer, {
    text: "",
  });

  useEffect(() => {
    const { text } = markdown;

    if (text.startsWith("# ")) {
      markdownDispatch({
        type: MARKDOWN_ACTION.TRANSFORM,
        renderTarget: <HComponent markdownDispatch={markdownDispatch} />,
      });
    }
  }, [markdown.text]);

  return (
    <div>
      {markdown.renderTarget ? (
        markdown.renderTarget
      ) : (
        <MarkdownDefaultInput markdownDispatch={markdownDispatch} />
      )}
    </div>
  );
};

export { MarkdownTransformer, MarkdownDefaultInput };

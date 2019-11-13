import React, { useEffect, useReducer } from "react";
import markdownReducer from "../../reducers/MarkdownReducer";
import { markdownActionCreator } from "../../actions/MarkdownAction";

const HComponent = () => {
  return <div>hello h component!</div>;
};

const MarkdownDefaultInput = ({ markdownDispatch }) => {
  const inputHandler = e => {
    const text = e.target.value;
    markdownDispatch(markdownActionCreator.input(text));
  };

  return (
    <div>
      <input type="text" onInput={inputHandler} />
    </div>
  );
};

const markdownRules = {
  h1: {
    syntax: "# ",
    component: dispatch => <HComponent markdownDispatch={dispatch} />,
  },
};

const MarkdownTransformer = () => {
  const [markdown, markdownDispatch] = useReducer(markdownReducer, {
    text: "",
  });

  useEffect(() => {
    const { text } = markdown;
    const { h1 } = markdownRules;

    // 이 부분에서 파서를 통해서 renderTarget에 원하는 컴포넌트를 추가할 수 있다.
    if (text.startsWith(h1.syntax)) {
      const component = h1.component(markdownDispatch);
      markdownDispatch(markdownActionCreator.transform(component));
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

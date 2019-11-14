import React, { useEffect, useReducer, useContext } from "react";
import markdownReducer from "../../reducers/MarkdownReducer";
import { markdownActionCreator } from "../../actions/MarkdownAction";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import cellReducer from "../../reducers/CellReducer";

const HComponent = () => {
  return <div>hello h component!</div>;
};

const MarkdownDefaultInput = ({ markdownDispatch }) => {
  const cellDispatch = useContext(CellDispatchContext);

  const inputHandler = e => {
    const text = e.target.value;
    markdownDispatch(markdownActionCreator.input(text));
  };

  const keyDownHandler = e => {
    const { key } = e;

    switch (key) {
      case "Enter":
        cellDispatch(cellActionCreator.new(<MarkdownDefaultInput />));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <input type="text" onInput={inputHandler} onKeyDown={keyDownHandler} />
    </>
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
  const { state } = useContext(CellContext);

  useEffect(() => {
    const { text } = state.cells[state.currentIndex + 1] || 0;
    const { h1 } = markdownRules;

    // 이 부분에서 파서를 통해서 renderTarget에 원하는 컴포넌트를 추가할 수 있다.
    if (text.startsWith(h1.syntax)) {
      const component = h1.component(markdownDispatch);
      markdownDispatch(cellActionCreator.transform(component));
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

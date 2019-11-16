import React, { useEffect, useContext } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

const HComponent = () => {
  return <div>hello h component!</div>;
};

const MarkdownDefaultInput = ({ cellDispatch }) => {
  const inputHandler = (e) => {
    const text = e.target.value;
    cellDispatch(cellActionCreator.input(text));
  };

  const keyDownHandler = (e) => {
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
      <input
        type="text"
        onInput={inputHandler}
        onKeyDown={keyDownHandler}
        // 임시로 해놓은 기능.
        // dispatch not a function 에러 고친 후 이걸 따로 빼서 focus 이벤트 줄 계획.
        ref={(input) => input && input.focus()}
      />
    </>
  );
};

const markdownRules = {
  h1: {
    syntax: "# ",
    component: (dispatch) => <HComponent cellDispatch={dispatch} />,
  },
};

const MarkdownTransformer = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);

  // console.log(state);
  useEffect(() => {
    const { text } = state.cells[state.currentIndex + 1] || 0;
    const { h1 } = markdownRules;

    // 이 부분에서 파서를 통해서 renderTarget에 원하는 컴포넌트를 추가할 수 있다.
    if (text && text.startsWith(h1.syntax)) {
      const component = h1.component(cellDispatch);
      cellDispatch(cellActionCreator.transform(component));
    }
  }, [state.texts[state.currentIndex]]);

  return (
    <div>
      {state.renderTarget ? (
        state.renderTarget
      ) : (
        <MarkdownDefaultInput cellDispatch={cellDispatch} />
      )}
    </div>
  );
};

export { MarkdownTransformer, MarkdownDefaultInput };

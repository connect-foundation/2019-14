import React, { useEffect, useContext } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

const HComponent = () => {
  return <div>hello h component!</div>;
};

const MarkdownDefaultInput = ({ currentIndex, cellDispatch }) => {
  const inputHandler = (e) => {
    const text = e.target.value;
    cellDispatch(cellActionCreator.input(text));
  };

  const keyDownEventDispatch = {
    Enter: () => {
      cellDispatch(
        cellActionCreator.new(
          <MarkdownDefaultInput
            currentIndex={currentIndex}
            cellDispatch={cellDispatch}
          />
        )
      );
      cellDispatch(cellActionCreator.next());
    },
    ArrowUp: () => {
      console.log("this is ArrowUp Event!");
    },
    ArrowDown: () => {
      console.log("this is ArrowDown Event!");
    },
  };

  const keyDownHandler = (e) => {
    const { key } = e;
    const exec = keyDownEventDispatch[key];
    if (exec) {
      exec();
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
  const { currentIndex } = state;
  const text = state.texts[currentIndex];
  const renderTarget = (
    <MarkdownDefaultInput
      currentIndex={currentIndex}
      cellDispatch={cellDispatch}
    />
  );

  if (!state.cells[currentIndex]) {
    cellDispatch(cellActionCreator.new(renderTarget));
  }

  useEffect(() => {
    const { h1 } = markdownRules;

    // 이 부분에서 파서를 통해서 renderTarget에 원하는 컴포넌트를 추가할 수 있다.
    if (text && text.startsWith(h1.syntax)) {
      const component = h1.component(cellDispatch);
      cellDispatch(cellActionCreator.transform(component, "transform h1 tag"));
    }
  }, [text]);

  return (
    <div>
      {state.cells[state.currentIndex]
        ? state.cells[state.currentIndex]
        : renderTarget}
    </div>
  );
};

export { MarkdownTransformer, MarkdownDefaultInput };

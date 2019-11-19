import React, { useEffect, useContext } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

const HComponent = () => {
  return <div>hello h component!</div>;
};

const useCellState = () => {
  const { state } = useContext(CellContext);
  return state;
};

const useCellDispatch = () => {
  const cellDispatch = useContext(CellDispatchContext);
  return cellDispatch;
};

const markdownRules = {
  h1: {
    syntax: "# ",
    component: () => <HComponent />,
  },
};

const MarkdownTransformer = ({ callback, inputRef }) => {
  const cellDispatch = useCellDispatch();
  const state = useCellState();
  const { currentIndex } = state;
  const text = state.texts[currentIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      const { cursor } = state;
      inputRef.current.selectionStart = cursor.start;
      inputRef.current.selectionEnd = cursor.end;

      // inputRef.current.value = "123";
      // console.log(inputRef.current.selectionStart);
      // console.log(inputRef.current.selectionEnd);
    }
  }, [inputRef]);

  useEffect(() => {
    const { h1 } = markdownRules;

    // 이 부분에서 파서를 통해서 renderTarget에 원하는 컴포넌트를 추가할 수 있다.
    if (text && text.startsWith(h1.syntax)) {
      const component = h1.component(cellDispatch);
      cellDispatch(
        cellActionCreator.transform(
          (callback, inputRef) => component,
          currentIndex,
          "transform h1 tag"
        )
      );
    }
  }, [text]);

  const inputHandler = (e) => {
    const { value } = e.target;
    cellDispatch(cellActionCreator.input(value));
  };

  const saveCursorPosition = () => {
    cellDispatch(
      cellActionCreator.move(
        inputRef.current.selectionStart,
        inputRef.current.selectionEnd
      )
    );
  };

  const focus = {
    next: () => {
      if (currentIndex < state.cells.length - 1) {
        cellDispatch(cellActionCreator.next());
        saveCursorPosition();
      }
    },
    prev: () => {
      if (currentIndex > 0) {
        cellDispatch(cellActionCreator.prev());
        saveCursorPosition();
      }
    },
  };

  const newCell = () => {
    cellDispatch(
      cellActionCreator.new((callback, ref) => (
        <MarkdownTransformer callback={callback} inputRef={ref} />
      ))
    );
  };

  const keyDownEventDispatch = {
    Enter: () => {
      newCell();
      focus.next();
    },
    ArrowUp: () => {
      focus.prev();
    },
    ArrowDown: () => {
      focus.next();
    },
  };

  const keyDownHandler = (e) => {
    const { key } = e;
    const exec = keyDownEventDispatch[key];
    if (exec) {
      e.preventDefault();
      callback(exec);
    }
  };

  return inputRef ? (
    <input
      type="text"
      onInput={inputHandler}
      onKeyDown={keyDownHandler}
      ref={inputRef}
    />
  ) : (
    <input type="text" onInput={inputHandler} onKeyDown={keyDownHandler} />
  );
};

export default MarkdownTransformer;

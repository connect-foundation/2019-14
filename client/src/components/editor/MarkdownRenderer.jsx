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
    component: <HComponent />,
  },
};

const MarkdownTransformer = ({ inputRef }) => {
  const cellDispatch = useCellDispatch();
  const cellState = useCellState();
  const { currentIndex } = state;
  const text = state.texts[currentIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      const { cursor } = state;
      inputRef.current.selectionStart = cursor.start;
      inputRef.current.selectionEnd = cursor.end;
    }
  }, [inputRef]);

  useEffect(() => {
    const { h1 } = markdownRules;

    // 이 부분에서 파서를 통해서 renderTarget에 원하는 컴포넌트를 추가할 수 있다.
    if (text && text.startsWith(h1.syntax)) {
      const { component } = h1;
      cellDispatch(
        cellActionCreator.transform(
          (callback, inputRef) => component,
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
    if (!inputRef) {
      return null;
    }
    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;
    cellDispatch(cellActionCreator.moveCursor(start, end));
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
      cellActionCreator.new((ref) => <MarkdownTransformer inputRef={ref} />)
    );
  };

  const keyDownEventDispatch = {
    Enter: (e) => {
      /**
       * @todo Shift + Enter 동작 추가 예정
       */
      if (e.shiftKey) {
        return () => {
          console.log("this is shift+enter");
        };
      }
      return () => {
        newCell();
        focus.next();
      };
    },
    ArrowUp: () => {
      return () => {
        focus.prev();
      };
    },
    ArrowDown: () => {
      return () => {
        focus.next();
      };
    },
    Tab: (e) => {
      if (e.shiftKey) {
        return () => {
          focus.prev();
        };
      }
      return () => {
        focus.next();
      };
    },
  };

  const keyDownHandler = (e) => {
    const { key } = e;
    const exec = keyDownEventDispatch[key];
    if (exec) {
      e.preventDefault();
      exec(e)();
    }
  };

  const focusHandler = (e) => {
    // console.log(e);
  };

  return inputRef ? (
    <input
      type="text"
      onInput={inputHandler}
      onKeyDown={keyDownHandler}
      onFocus={focusHandler}
      ref={inputRef}
    />
  ) : (
    <input
      type="text"
      onInput={inputHandler}
      onKeyDown={keyDownHandler}
      onFocus={focusHandler}
    />
  );
};

export default MarkdownTransformer;

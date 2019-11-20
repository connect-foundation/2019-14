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

const MarkdownTransformer = ({ cellIndex, inputRef }) => {
  const cellDispatch = useCellDispatch();
  const cellState = useCellState();
  const { currentIndex, cursor } = cellState;
  const text = cellState.texts[cellIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
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

  const currentCursorPosition = () => {
    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;
    return {
      start,
      end,
    };
  };

  const saveCursorPosition = () => {
    if (!inputRef) {
      return null;
    }
    const currentCursor = currentCursorPosition();
    cellDispatch(
      cellActionCreator.moveCursor(currentCursor.start, currentCursor.end)
    );
  };

  const focus = {
    next: () => {
      if (currentIndex < cellState.cells.length - 1) {
        cellDispatch(cellActionCreator.focusNext());
        saveCursorPosition();
      }
    },
    prev: () => {
      if (currentIndex > 0) {
        cellDispatch(cellActionCreator.focusPrev());
        saveCursorPosition();
      }
    },
  };

  const newCell = () => {
    cellDispatch(
      cellActionCreator.new((index, ref) => (
        <MarkdownTransformer cellIndex={index} inputRef={ref} />
      ))
    );
  };

  const keyDownEventDispatch = {
    Enter: (e) => {
      const currentTag = false;
      if (currentTag && text.length === 0) {
        return () => {
          cellDispatch(
            cellActionCreator.init(
              (index, ref) => (
                <MarkdownTransformer cellIndex={index} inputRef={ref} />
              ),
              currentIndex
            )
          );
        };
      }

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
    Backspace: (e) => {
      const currentCursor = currentCursorPosition();

      if (
        currentCursor.start === currentCursor.end &&
        currentCursor.start === 0
      ) {
        return () => {
          cellDispatch(
            cellActionCreator.init(
              (index, ref) => (
                <MarkdownTransformer cellIndex={index} inputRef={ref} />
              ),
              currentIndex
            )
          );
        };
      }
      return () => {};
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
      if (key !== "Backspace") {
        e.preventDefault();
      }
      exec(e)();
    }
  };

  const focusHandler = () => {
    cellDispatch(cellActionCreator.focusMove(cellIndex));
    saveCursorPosition();
  };

  return inputRef ? (
    <input
      type="text"
      onInput={inputHandler}
      onKeyDown={keyDownHandler}
      onFocus={focusHandler}
      ref={inputRef}
      value={text}
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

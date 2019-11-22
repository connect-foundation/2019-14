import React, { useEffect, useContext } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import { stateAttr, MarkdownWrapper } from "./EditorInput";

const useCellState = () => {
  const { state } = useContext(CellContext);
  return state;
};

const useCellDispatch = () => {
  const cellDispatch = useContext(CellDispatchContext);
  return cellDispatch;
};

const getSelection = () => {
  const selection = window.getSelection();
  const cursor = {
    start: selection.focusOffset,
    end: selection.focusOffset + selection.rangeCount - 1,
  };
  return cursor;
};

const MarkdownTransformer = ({ cellUuid }) => {
  const cellDispatch = useCellDispatch();
  const cellState = useCellState();
  const { currentIndex, uuidManager, cursor } = cellState;
  let inputRef = null;

  const cellIndex = uuidManager.findIndex(cellUuid);
  if (currentIndex === cellIndex) {
    inputRef = cellState.inputRef;
  }
  const text = cellState.texts[cellIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      const front = text.slice(0, cursor.start);
      const back = text.slice(cursor.start, text.length);
      const content = `${front}<span id="cursorCaret"></span>${back}`;
      inputRef.current.innerHTML = content;

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const cursorCaret = document.querySelector("#cursorCaret");
      range.selectNode(cursorCaret);
      // selection.removeAllRanges();
      // range.setStart(range.startContainer, textContent.length);
      // range.setEnd(range.startContainer, textContent.length);
      console.log(range);
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();
      // selection.addRange(range);
    }
  }, []);

  const saveCursorPosition = () => {
    if (!inputRef) {
      return null;
    }
    const currentCursor = getSelection();

    cellDispatch(
      cellActionCreator.moveCursor(currentCursor.start, currentCursor.end)
    );
    return null;
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
      cellActionCreator.new((uuid) => <MarkdownTransformer cellUuid={uuid} />)
    );
  };

  const keyDownEventDispatch = {
    Enter: (e) => {
      /**
       * @todo 태그에 따라 빈 셀에서 엔터 입력시 초기화하는 기능
       * - 다른 기능 완료 후 다시 활성화 및 완성
       * - 태그 기능 스토어 및 액션, 리듀서에 등록 후 활성화
       */
      // const currentTag = false;
      // if (currentTag && text.length === 0) {
      //   return () => {
      //     cellDispatch(
      //       cellActionCreator.init(
      //         (index, ref) => (
      //           <MarkdownTransformer cellIndex={index} inputRef={ref} />
      //         ),
      //         currentIndex
      //       )
      //     );
      //   };
      // }

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
    /**
     * @todo 빈 셀에서 백스페이스 입력시 셀 초기화 기능
     * - 다른 기능 완료 후 다시 활성화 및 완성
     */
    // Backspace: (e) => {
    //   const currentCursor = currentCursorPosition();

    //   if (
    //     currentCursor.start === currentCursor.end &&
    //     currentCursor.start === 0
    //   ) {
    //     return () => {
    //       cellDispatch(
    //         cellActionCreator.init(
    //           (index, ref) => (
    //             <MarkdownTransformer cellIndex={index} inputRef={ref} />
    //           ),
    //           currentIndex
    //         )
    //       );
    //     };
    //   }
    //   return () => {};
    // },
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

  const inputHandler = (e) => {
    const { textContent } = e.target;

    saveCursorPosition();
    cellDispatch(cellActionCreator.input(textContent));
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

  const keyPressHandler = (e) => {
    const { key } = e;
    if (key === " ") {
      console.log(stateAttr[text]);
      // if (!state.type)
      //   setState({
      //     ...state,
      //     ...stateAttr[text],
      //   });
    }
  };

  const focusHandler = () => {
    /**
     * @todo 버그로 인한 비활성화
     * - 무한 렌더링 버그
     */
    // cellDispatch(cellActionCreator.focusMove(cellIndex));
    // saveCursorPosition();
  };

  return (
    <MarkdownWrapper
      // as={stateAttr[text].type}
      // isQuote={isQuote}
      // placeholder={state.placeholder}
      contentEditable
      onInput={inputHandler}
      onKeyPress={keyPressHandler}
      onKeyDown={keyDownHandler}
      onFocus={focusHandler}
      ref={inputRef || null}
    />
  );
};

export default MarkdownTransformer;

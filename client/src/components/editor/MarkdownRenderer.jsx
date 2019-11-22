import React, { useEffect, useContext } from "react";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import EditorInput from "./EditorInput";

const useCellState = () => {
  const { state } = useContext(CellContext);
  return state;
};

const useCellDispatch = () => {
  const cellDispatch = useContext(CellDispatchContext);
  return cellDispatch;
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

  useEffect(() => {
    if (inputRef && inputRef.current) {
      console.log(inputRef.current);
    }
    // }
  }, []);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = cursor.start;
      inputRef.current.selectionEnd = cursor.end;
    }
  }, [inputRef]);

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
    /**
     * @todo 버그로 인한 비활성화
     * - 무한 렌더링 버그
     */
    // cellDispatch(cellActionCreator.focusMove(cellIndex));
    // saveCursorPosition();
  };

  return inputRef ? (
    <EditorInput
      onKeyDown={keyDownHandler}
      onFocus={focusHandler}
      inputRef={inputRef}
    />
  ) : (
    <EditorInput onKeyDown={keyDownHandler} onFocus={focusHandler} />
  );
};

export default MarkdownTransformer;

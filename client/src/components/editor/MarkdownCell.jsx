import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import MarkdownWrapper from "./style/MarkdownWrapper";
import { MARKDOWN } from "../../enums";

const { RULE, PLACEHOLDER } = MARKDOWN;

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

const MarkdownCell = ({ cellUuid }) => {
  const cellDispatch = useCellDispatch();
  const cellState = useCellState();
  const { currentIndex, uuidManager, cursor } = cellState;
  let inputRef = null;

  const cellIndex = uuidManager.findIndex(cellUuid);
  if (currentIndex === cellIndex) {
    inputRef = cellState.inputRef;
  }
  const text = cellState.texts[cellIndex];
  const tag = cellState.tags[cellIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      const cursorFront = text.slice(0, cursor.start);
      const cursorBack = text.slice(cursor.start, text.length);
      const content = `${cursorFront}<span id="cursorCaret"></span>${cursorBack}`;
      inputRef.current.innerHTML = content;

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const cursorCaret = document.querySelector("#cursorCaret");
      range.selectNode(cursorCaret);
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();
      inputRef.current.normalize();
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
      cellActionCreator.new((uuid) => <MarkdownCell cellUuid={uuid} />)
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
      //           <MarkdownCell cellIndex={index} inputRef={ref} />
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
    //             <MarkdownCell cellIndex={index} inputRef={ref} />
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
    const { innerHTML } = e.target;
    const exec = keyDownEventDispatch[key];

    if (exec) {
      if (key !== "Backspace") {
        e.preventDefault();
      }
      saveCursorPosition();
      cellDispatch(cellActionCreator.input(innerHTML));
      exec(e)();
    }
  };

  const keyPressHandler = (e) => {
    const { key } = e;
    const { textContent } = e.target;

    if (RULE[textContent] && key === " ") {
      const type = RULE[textContent];
      if (type) {
        cellDispatch(cellActionCreator.transform(cellIndex, "", type));
      }
    }
  };

  const focusHandler = (e) => {
    /**
     * @todo 버그로 인한 비활성화
     * - 무한 루프 버그
     */

    cellDispatch(cellActionCreator.focusMove(cellIndex));
    saveCursorPosition();
  };

  const blurHandler = (e) => {
    /**
     * @todo 클릭시 포커스 이동할 때의 이벤트
     * 버그로 인해 비활성화
     */
    const { innerHTML } = e.target;
    console.log(innerHTML);

    // saveCursorPosition();
    // cellDispatch(cellActionCreator.input(textContent));
  };

  return (
    <MarkdownWrapper
      as={tag}
      isQuote={tag === "blockquote"}
      placeholder={PLACEHOLDER[tag]}
      contentEditable
      onKeyPress={keyPressHandler}
      onKeyDown={keyDownHandler}
      onBlur={blurHandler}
      // onFocus={focusHandler}
      ref={inputRef || null}
      suppressContentEditableWarning
    >
      {text}
    </MarkdownWrapper>
  );
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;

import React, { useRef, useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "./style/MarkdownWrapper";
import { getType } from "../../utils";
import CELL_TAG from "../../enums/CELL_TAG";
import { PLACEHOLDER } from "../../enums";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import cellGenerator from "./CellGenerator";

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
  const currentTag = cellState.tags[cellIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      // const cursorFront = text.slice(0, cursor.start);
      // const cursorBack = text.slice(cursor.start, text.length);

      // const content = `${cursorFront}<span id="cursorCaret"></span>${cursorBack}`;

      // inputRef.current.innerHTML = content;

      // const selection = window.getSelection();
      // const range = selection.getRangeAt(0);

      // const cursorCaret = document.querySelector("#cursorCaret");

      // range.selectNode(cursorCaret);

      // selection.removeAllRanges();
      // selection.addRange(range);

      // range.deleteContents();

      // inputRef.current.normalize();
    }
  }, []);

  const onKeyPress = (e) => {
    const { textContent } = e.target;

    const matchingTag = getType(textContent);

    if (matchingTag && matchingTag !== currentTag) {
      const makeNewCell = cellGenerator[matchingTag];
      const cell = makeNewCell(cellUuid);
      console.log("hello cell", cell);
      cellDispatch(
        cellActionCreator.transform(cellIndex, "", matchingTag, cell)
      );
    }
  };
  /*
  useEffect(() => {
    let start = 1;

    if (tag === "ol") start = parseInt(text.replace(".", ""));

    cellDispatch(cellActionCreator.transform(cellIndex, "", tag));
  }, [tag]);
*/
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

  // const isUnorderedList = tag === "ul";
  // const isOrderedList = tag === "ol";
  // const isQuote = tag === "blockquote";
  // const isCode = tag === "code";
  // const isHorizontalRule = tag === "hr";

  const renderTarget = (
    <MarkdownWrapper
      as={currentTag}
      placeholder={PLACEHOLDER[currentTag]}
      contentEditable
      onKeyDown={keyDownHandler}
      onKeyPress={onKeyPress}
      onBlur={blurHandler}
      // onFocus={focusHandler}
      ref={inputRef || null}
      suppressContentEditableWarning
    >
      {text}
    </MarkdownWrapper>
  );

  // if (isUnorderedList) {
  //  renderTarget = (
  //    <MarkdownWrapper as={tag}>
  //      <MarkdownWrapper
  //        as="li"
  //        placeholder={PLACEHOLDER[tag]}
  //        contentEditable
  //        onKeyDown={keyDownHandler}
  //        onKeyPress={onKeyPress}
  //        onBlur={blurHandler}
  //        // onFocus={focusHandler}
  //        ref={inputRef || null}
  //        suppressContentEditableWarning
  //      >
  //        {text}
  //      </MarkdownWrapper>
  //    </MarkdownWrapper>
  //  );
  // }

  // if (isOrderedList) {
  //  renderTarget = (
  //    <MarkdownWrapper as={tag}>
  //      {/* start={start}> */}
  //      <MarkdownWrapper
  //        as="li"
  //        isQuote={tag === "blockquote"}
  //        placeholder={PLACEHOLDER[tag]}
  //        contentEditable
  //        onKeyDown={keyDownHandler}
  //        onKeyPress={onKeyPress}
  //        onBlur={blurHandler}
  //        // onFocus={focusHandler}
  //        ref={inputRef || null}
  //        suppressContentEditableWarning
  //      >
  //        {text}
  //      </MarkdownWrapper>
  //    </MarkdownWrapper>
  //  );
  // }

  // if (isCode) {
  //  renderTarget = (
  //    <pre>
  //      <MarkdownWrapper
  //        as={tag}
  //        isQuote={tag === "blockquote"}
  //        placeholder={PLACEHOLDER[tag]}
  //        contentEditable
  //        onKeyDown={keyDownHandler}
  //        onKeyPress={onKeyPress}
  //        onBlur={blurHandler}
  //        // onFocus={focusHandler}
  //        ref={inputRef || null}
  //        suppressContentEditableWarning
  //      >
  //        {text}
  //      </MarkdownWrapper>
  //    </pre>
  //  );
  // }

  // if (isHorizontalRule) {
  //  renderTarget = <hr noshade="noshade" style={{ borderColor: "silver" }} />;
  // }

  return renderTarget;
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;

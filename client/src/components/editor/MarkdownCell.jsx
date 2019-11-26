import React, { useRef, useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "./style/MarkdownWrapper";
import getType from "../../utils/getType";
import CELL_TAG from "../../enums/CELL_TAG";
import { PLACEHOLDER, EVENT_TYPE } from "../../enums";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import cellGenerator from "./CellGenerator";
import { handlerManager } from "../../utils";

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

  handlerManager.clearWindowKeydownEvent();

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
    // focus.next();
  };

  if (currentIndex === cellIndex) {
    inputRef = cellState.inputRef;
    handlerManager.clearWindowKeydownEvent();
    handlerManager.initHandler();
    handlerManager.setHandler(EVENT_TYPE.ENTER, (e) => {
      const { innerHTML } = e.target;
      saveCursorPosition();
      cellDispatch(cellActionCreator.input(innerHTML));
      newCell();
      focus.next();
    });
    handlerManager.setHandler(EVENT_TYPE.ARROW_UP, focus.prev);
    handlerManager.setHandler(EVENT_TYPE.ARROW_DOWN, focus.next);
    handlerManager.setHandler(EVENT_TYPE.TAB, focus.next);
    handlerManager.setHandler(EVENT_TYPE.SHIFT_TAB, focus.prev);
    handlerManager.setWindowKeydownEvent();
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
    // console.log(innerHTML);

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

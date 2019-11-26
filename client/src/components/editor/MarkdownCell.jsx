import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "./style/MarkdownWrapper";
import getType from "../../utils/getType";
import { PLACEHOLDER, EVENT_TYPE, CELL_TAG } from "../../enums";
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
    next: (e) => {
      if (cellIndex < cellState.cells.length - 1) {
        const { innerHTML } = e.target;
        saveCursorPosition();
        cellDispatch(cellActionCreator.input(cellUuid, innerHTML));
        cellDispatch(cellActionCreator.focusNext());
      }
    },
    prev: (e) => {
      if (currentIndex > 0) {
        const { innerHTML } = e.target;
        saveCursorPosition();
        cellDispatch(cellActionCreator.input(cellUuid, innerHTML));
        cellDispatch(cellActionCreator.focusPrev());
      }
    },
  };

  const newCell = () => {
    cellDispatch(
      cellActionCreator.new((uuid) => <MarkdownCell cellUuid={uuid} />)
    );
  };

  if (currentIndex === cellIndex) {
    inputRef = cellState.inputRef;
    handlerManager.initHandler();
    handlerManager.setHandler(EVENT_TYPE.ENTER, (e) => {
      const { innerHTML } = e.target;
      saveCursorPosition();
      cellDispatch(cellActionCreator.input(cellUuid, innerHTML));
      newCell();
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
    const isSaved = (e) => {
      e.preventDefault();
      e.returnValue = "정말로 닫으시겠습니까?";
    };
    window.addEventListener("beforeunload", isSaved);
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

  const renderTarget = (
    <MarkdownWrapper
      as={currentTag}
      placeholder={PLACEHOLDER[currentTag]}
      contentEditable
      onKeyPress={onKeyPress}
      ref={inputRef || null}
      suppressContentEditableWarning
    >
      {text}
    </MarkdownWrapper>
  );

  return renderTarget;
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;

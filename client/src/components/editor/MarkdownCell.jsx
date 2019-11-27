import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "./style/MarkdownWrapper";
import { PLACEHOLDER, EVENT_TYPE } from "../../enums";
import cellGenerator from "./CellGenerator";
import { getType, getStart, handlerManager } from "../../utils";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

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

const saveCursorPosition = (cellDispatch, inputRef) => {
  if (!inputRef) {
    return null;
  }

  const currentCursor = getSelection();
  cellDispatch(
    cellActionCreator.moveCursor(currentCursor.start, currentCursor.end)
  );

  return null;
};

const newCell = (cellDispatch) => {
  cellDispatch(
    cellActionCreator.new((uuid) => <MarkdownCell cellUuid={uuid} />)
  );
};

const saveText = (cellUuid, textContent, cellDispatch, inputRef) => {
  saveCursorPosition(cellDispatch, inputRef);
  cellDispatch(cellActionCreator.input(cellUuid, textContent));
};

const isContinueNext = (cellIndex, cellLength) => {
  if (cellIndex < cellLength - 1) {
    return true;
  }
  return false;
};

const isContinuePrev = (cellIndex) => {
  if (cellIndex > 0) {
    return true;
  }
  return false;
};

const focusNext = (cellUuid, textContent, cellDispatch, inputRef) => {
  saveText(cellUuid, textContent, cellDispatch, inputRef);
  cellDispatch(cellActionCreator.focusNext());
};

const focusPrev = (cellUuid, textContent, cellDispatch, inputRef) => {
  saveText(cellUuid, textContent, cellDispatch, inputRef);
  cellDispatch(cellActionCreator.focusPrev());
};

const createCursor = (text, cursor) => {
  const cursorFront = text.slice(0, cursor.start);
  const cursorBack = text.slice(cursor.start, text.length);
  const content = `${cursorFront}<span id="cursorCaret"></span>${cursorBack}`;
  return content;
};

const setCursorPosition = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const cursorCaret = document.querySelector("#cursorCaret");
  range.selectNode(cursorCaret);
  selection.removeAllRanges();
  selection.addRange(range);
  range.deleteContents();
};

const MarkdownCell = ({ cellUuid }) => {
  const cellDispatch = useCellDispatch();
  const cellState = useCellState();
  const { currentIndex, uuidManager, start, cursor } = cellState;
  let inputRef = null;

  const cellIndex = uuidManager.findIndex(cellUuid);

  if (currentIndex === cellIndex) {
    inputRef = cellState.inputRef;
    const keydownHandlers = {
      [EVENT_TYPE.ENTER]: (e) => {
        const { textContent } = e.target;
        saveCursorPosition(cellDispatch, inputRef);
        cellDispatch(cellActionCreator.input(cellUuid, textContent));
        newCell(cellDispatch);
      },
      [EVENT_TYPE.ARROW_UP]: (e) => {
        if (isContinuePrev(cellIndex)) {
          focusPrev(cellUuid, e.target.textContent, cellDispatch, inputRef);
        }
      },
      [EVENT_TYPE.ARROW_DOWN]: (e) => {
        if (isContinueNext(cellIndex, cellState.cells.length)) {
          focusNext(cellUuid, e.target.textContent, cellDispatch, inputRef);
        }
      },
    };
    handlerManager.attachKeydownEvent(window, keydownHandlers);
  }

  const text = cellState.texts[cellIndex];
  const currentTag = cellState.tags[cellIndex];

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      const content = createCursor(text, cursor);
      inputRef.current.innerHTML = content;
      setCursorPosition();
      inputRef.current.normalize();
    }
    /**
     * 거슬려서 잠시 주석
     */
    // const isSaved = (e) => {
    //   e.preventDefault();
    //   e.returnValue = "정말로 닫으시겠습니까?";
    // };
    // window.addEventListener("beforeunload", isSaved);
  }, []);

  const onKeyPress = (e) => {
    const { textContent } = e.target;

    const matchingTag = getType(textContent);

    if (matchingTag && matchingTag !== currentTag) {
      const makeNewCell = cellGenerator[matchingTag];

      if (matchingTag === "ol") {
        const newStart = start ? start + 1 : getStart(textContent);
        const cell = makeNewCell(cellUuid, newStart);

        cellDispatch(
          cellActionCreator.transform(
            cellIndex,
            "",
            matchingTag,
            cell,
            newStart
          )
        );
      } else {
        const cell = makeNewCell(cellUuid);

        cellDispatch(
          cellActionCreator.transform(cellIndex, "", matchingTag, cell)
        );
      }
    }
  };

  const htmlText = () => {
    /**
     * @todo text에 대한 보안장치 필요
     * @todo text에 대해 원하는 것 외에는 전부 유니코드로 바꾸는 로직 필요
     * - placeholder의 key 배열에 해당하는 태그 외에는 전부 변환한다던가
     */
    return { __html: text };
  };

  const renderTarget = (
    <MarkdownWrapper
      as={currentTag}
      placeholder={PLACEHOLDER[currentTag]}
      contentEditable
      onKeyPress={onKeyPress}
      ref={inputRef || null}
      // suppressContentEditableWarning
      dangerouslySetInnerHTML={htmlText()}
    />
  );

  return renderTarget;
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;

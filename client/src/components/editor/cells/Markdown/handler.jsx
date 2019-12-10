import { cellActionCreator } from "../../../../actions/CellAction";
import getType from "../../../../utils/getType";
import getStart from "../../../../utils/getStart";
import { cellGenerator } from "../CellGenerator";

const getSelection = () => {
  const selection = window.getSelection();
  const cursor = {
    start: selection.focusOffset,
    end: selection.focusOffset + selection.rangeCount - 1,
  };

  return cursor;
};

const saveCursorPosition = (cellDispatch) => {
  const currentCursor = getSelection();
  cellDispatch(
    cellActionCreator.moveCursor(currentCursor.start, currentCursor.end)
  );

  return null;
};

const newCell = (cellUuid, cellDispatch, componentCallback, tag) => {
  cellDispatch(cellActionCreator.new(cellUuid, componentCallback, tag));
};

const deleteCell = (cellDispatch, cellUuid, textContent) => {
  cellDispatch(cellActionCreator.delete(cellUuid, textContent));
};

const focusNext = (cellDispatch) => {
  saveCursorPosition(cellDispatch);
  cellDispatch(cellActionCreator.focusNext());
};

const focusPrev = (cellDispatch) => {
  saveCursorPosition(cellDispatch);
  cellDispatch(cellActionCreator.focusPrev());
};

const blockEndUp = (cellUuid, cellDispatch) => {
  cellDispatch(cellActionCreator.blockUp(cellUuid));
};

const blockEndDown = (cellUuid, cellDispatch) => {
  cellDispatch(cellActionCreator.blockDown(cellUuid));
};

const blockRelease = (cellDispatch) => {
  cellDispatch(cellActionCreator.blockRelease());
};

const transformCell = (cellUuid, cellDispatch, text, tag, start = null) => {
  const { findPattern, matchingTag } = getType(text);

  if (matchingTag && matchingTag !== tag) {
    const makeNewCell = cellGenerator[matchingTag];

    const isOrderedList = matchingTag === "ol";

    let newStart = null;
    if (isOrderedList) {
      newStart = start ? start + 1 : getStart(text);
    } else {
      newStart = 0;
    }

    const cell = makeNewCell(cellUuid, {
      start: newStart,
    });
    let exceptPatternText = "";
    if (findPattern) {
      exceptPatternText = text.slice(findPattern[0].length);
    }
    cellDispatch(
      cellActionCreator.transform(
        cellUuid,
        exceptPatternText,
        matchingTag,
        cell,
        newStart
      )
    );
  }
};

export {
  getSelection,
  newCell,
  deleteCell,
  saveCursorPosition,
  focusPrev,
  focusNext,
  blockEndUp,
  blockEndDown,
  blockRelease,
  transformCell,
};

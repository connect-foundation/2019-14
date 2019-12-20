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

const newCell = (cellDispatch) => {
  cellDispatch(cellActionCreator.new());
};

const deleteCell = (cellDispatch, textContent = "") => {
  cellDispatch(cellActionCreator.delete(textContent));
};

const focusNext = (cellDispatch) => {
  saveCursorPosition(cellDispatch);
  cellDispatch(cellActionCreator.focusNext());
};

const focusPrev = (cellDispatch) => {
  saveCursorPosition(cellDispatch);
  cellDispatch(cellActionCreator.focusPrev());
};

const blockEndUp = (cellDispatch) => {
  cellDispatch(cellActionCreator.blockUp());
};

const blockEndDown = (cellDispatch) => {
  cellDispatch(cellActionCreator.blockDown());
};

const blockRelease = (cellDispatch) => {
  cellDispatch(cellActionCreator.blockRelease());
};

const transformCell = (cellUuid, cellDispatch, text, tag) => {
  const { findPattern, matchingTag } = getType(text);

  if (matchingTag && matchingTag !== tag) {
    const makeNewCell = cellGenerator[matchingTag];

    const isOrderedList = matchingTag === "ol";

    const depth = 0;
    let start = null;
    if (isOrderedList) {
      start = getStart(text);
    }

    const cell = makeNewCell(cellUuid);
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
        depth,
        start
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

import { cellActionCreator } from "../../../../actions/CellAction";

const getSelection = () => {
  const selection = window.getSelection();

  const cursor = {
    start: selection.focusOffset,
    end: selection.focusOffset + selection.rangeCount - 1
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

const newCell = (cellDispatch, componentCallback, tag) => {
  if (tag) {
    cellDispatch(cellActionCreator.new(componentCallback, tag));
  } else {
    cellDispatch(cellActionCreator.new(componentCallback));
  }
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

const isContinuePrev = cellIndex => {
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
  if (selection.focusNode) {
    const range = selection.getRangeAt(0);
    const cursorCaret = document.querySelector("#cursorCaret");
    range.selectNode(cursorCaret);
    selection.removeAllRanges();
    selection.addRange(range);
    range.deleteContents();
  }
};

export {
  newCell,
  saveCursorPosition,
  isContinuePrev,
  focusPrev,
  isContinueNext,
  focusNext,
  createCursor,
  setCursorPosition
};

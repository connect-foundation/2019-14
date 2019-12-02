import { cellActionCreator } from "../../../../actions/CellAction";

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

const newCell = (cellUuid, cellDispatch, componentCallback, tag) => {
  if (tag) {
    cellDispatch(cellActionCreator.new(cellUuid, componentCallback, tag));
  } else {
    cellDispatch(cellActionCreator.new(cellUuid, componentCallback));
  }
};

const deleteCell = (cellDispatch, cellUuid, textContent) => {
  if (textContent) {
    cellDispatch(cellActionCreator.delete(cellUuid, textContent));
  } else {
    cellDispatch(cellActionCreator.delete(cellUuid));
  }
};

const saveText = (cellUuid, textContent, cellDispatch, inputRef) => {
  saveCursorPosition(cellDispatch, inputRef);
  cellDispatch(cellActionCreator.input(cellUuid, textContent));
};

const focusNext = (cellUuid, textContent, cellDispatch, inputRef) => {
  saveText(cellUuid, textContent, cellDispatch, inputRef);
  cellDispatch(cellActionCreator.focusNext());
};

const focusPrev = (cellUuid, textContent, cellDispatch, inputRef) => {
  saveText(cellUuid, textContent, cellDispatch, inputRef);
  cellDispatch(cellActionCreator.focusPrev());
};

const blockEndUp = (cellUuid, cellDispatch) => {
  cellDispatch(cellActionCreator.blockUp(cellUuid));
};

const blockEndDown = (cellUuid, cellDispatch) => {
  cellDispatch(cellActionCreator.blockDown(cellUuid));
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
  getSelection,
  newCell,
  deleteCell,
  saveCursorPosition,
  focusPrev,
  focusNext,
  blockEndUp,
  blockEndDown,
  createCursor,
  setCursorPosition,
};

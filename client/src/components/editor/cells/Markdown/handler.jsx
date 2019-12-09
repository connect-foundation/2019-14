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

const changeSpecialCharacter = (html) => {
  let str = html.slice();
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  return str;
};

const resetSpecialCharacter = (text) => {
  let str = text.slice();
  str = str.replace(/(&lt;)/g, "<");
  str = str.replace(/(&gt;)/g, ">");
  return str;
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

const htmlText = (text) => {
  /**
   * @todo text에 대한 보안장치 필요
   * @todo text에 대해 원하는 것 외에는 전부 유니코드로 바꾸는 로직 필요
   * - placeholder의 key 배열에 해당하는 태그 외에는 전부 변환한다던가
   */
  return { __html: changeSpecialCharacter(text) };
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
  changeSpecialCharacter,
  resetSpecialCharacter,
  htmlText,
};

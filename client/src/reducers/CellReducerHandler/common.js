import { uuid } from "uuidv4";
import { utils, uuidManager } from "../../utils";

const { splice } = utils;

const initUuid = (cellUuid, newCellUuid) => {
  if (!cellUuid) {
    uuidManager.push(newCellUuid);
  }
};

const initCell = (cellUuid, cellManager, dataObj) => {
  const index = cellUuid ? uuidManager.findIndex(cellUuid) : 0;
  const targetUuid = uuidManager.uuidArray[index];
  const cells = splice.change(
    cellManager.cells,
    index,
    dataObj.cell(targetUuid)
  );
  const texts = splice.change(cellManager.texts, index, dataObj.text);
  const tags = splice.change(cellManager.tags, index, dataObj.tag);

  return {
    cells,
    texts,
    tags,
  };
};

const newUuid = (index, newCellUuid) => {
  uuidManager.push(newCellUuid, index);
};

const newCell = (cellUuid, cellManager, dataObj) => {
  const { createCellCallback, cursor, tag, start } = dataObj;
  const index = uuidManager.findIndex(cellUuid);

  const isOrderedList = tag === "ol";
  const newStart = isOrderedList ? start + 1 : null;
  const newCellUuid = uuidManager.uuidArray[index + 1];
  const cell = isOrderedList
    ? createCellCallback(newCellUuid, newStart)
    : createCellCallback(newCellUuid);

  const cells = splice.add(cellManager.cells, index, cell);
  const originText = cellManager.texts[index];
  const currentText = originText ? originText.slice(0, cursor.start) : "";
  const newText = originText ? originText.slice(cursor.start) : "";
  let texts = splice.change(cellManager.texts, index, currentText);
  texts = splice.add(texts, index, newText);
  const tags = splice.add(cellManager.tags, index, tag);

  const newCursor = {
    start: 0,
    end: 0,
  };

  const currentIndex = index + 1;

  return {
    cells,
    texts,
    tags,
    cursor: newCursor,
    currentIndex,
    start: newStart,
  };
};

const inputText = (cellUuid, cellManager, text) => {
  const index = uuidManager.findIndex(cellUuid);
  const texts = splice.change(cellManager.texts, index, text);
  return {
    texts,
  };
};

export default {
  initUuid,
  initCell,
  newUuid,
  newCell,
  inputText,
};

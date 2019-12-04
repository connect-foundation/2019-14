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
  cellManager.change(index, {
    cell: dataObj.cell(targetUuid),
    text: dataObj.text,
    tag: dataObj.tag,
  });
};

const newUuid = (index, newCellUuid) => {
  uuidManager.push(newCellUuid, index);
};

const newCell = (cellUuid, cellManager, dataObj) => {
  const { createCellCallback, cursor, tag, start } = dataObj;
  const index = uuidManager.findIndex(cellUuid);
  const uuidArray = uuidManager.getUuidArray();

  const isOrderedList = tag === "ol";
  const newStart = isOrderedList ? start + 1 : null;
  const newCellUuid = uuidArray[index + 1];
  const cell = isOrderedList
    ? createCellCallback(newCellUuid, newStart)
    : createCellCallback(newCellUuid);

  const originText = cellManager.texts[index];
  const currentText = originText ? originText.slice(0, cursor.start) : "";
  cellManager.change(index, { text: currentText });

  const newText = originText ? originText.slice(cursor.start) : "";
  const data = {
    cell,
    text: newText,
    tag,
  };
  cellManager.add(index, data);

  const newCursor = {
    start: 0,
    end: 0,
  };

  const currentIndex = index + 1;

  return {
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

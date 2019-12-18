import { uuid } from "uuidv4";
import { uuidManager } from "../../utils";
import { cellGenerator } from "../../components/editor/cells/CellGenerator";

const initCell = (cellManager) => {
  const index = 0;
  const newUuid = uuid();

  uuidManager.push(newUuid);

  cellManager.change(index, {
    cell: cellGenerator.p(newUuid),
    text: "",
    tag: "p",
  });
  cellManager.deleteOption(index);
};

const newDefaultEmptyCell = (cellUuid, cellManager) => {
  const index = uuidManager.findIndex(cellUuid);
  const newUuid = uuid();
  uuidManager.push(newUuid, index);
  const newData = {
    cell: cellGenerator.p(newUuid),
    text: "",
    tag: "p",
  };
  cellManager.add(index, newData);
};

const newCell = (cellUuid, cellManager, dataObj) => {
  const { createCellCallback, cursor, tag, depth, start } = dataObj;

  const isOrderedList = tag === "ol";
  const isList = isOrderedList || tag === "ul";
  const index = uuidManager.findIndex(cellUuid);

  uuidManager.push(uuid(), index);

  const uuidArray = uuidManager.getUuidArray();
  const newStart = isOrderedList ? start + 1 : null;
  const newDepth = isList ? depth : 0;

  const newCellUuid = uuidArray[index + 1];
  const cell = createCellCallback(newCellUuid);

  if (isOrderedList) {
    cellManager.addOption(index + 1, { depth: newDepth, start: newStart });
  } else if (isList) {
    cellManager.addOption(index + 1, { depth: newDepth });
  }

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
  };
};

const inputText = (cellUuid, cellManager, dataObj) => {
  const { text } = dataObj;
  const index = uuidManager.findIndex(cellUuid);
  cellManager.change(index, { text });
};

const deleteCell = (cellUuid, cellManager, dataObj) => {
  const { text } = dataObj;
  const index = uuidManager.findIndex(cellUuid);
  const prevIndex = index - 1;

  uuidManager.pop(index);

  const cursor = {
    start: prevIndex >= 0 ? cellManager.texts[prevIndex].length : 0,
    end: prevIndex >= 0 ? cellManager.texts[prevIndex].length : 0,
  };
  const joinedText = cellManager.texts[prevIndex] + text;

  const flag = {
    cell: true,
    text: true,
    tag: true,
  };
  cellManager.delete(index, flag);
  cellManager.change(prevIndex, { text: joinedText });

  return {
    cursor,
    currentIndex: prevIndex,
  };
};

export default {
  initCell,
  newDefaultEmptyCell,
  newCell,
  inputText,
  deleteCell,
};

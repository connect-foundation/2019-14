import { uuid } from "uuidv4";
import { uuidManager } from "../../utils";
import { cellGenerator } from "../../components/editor/cells/CellGenerator";

const initCell = (cellManager) => {
  const index = 0;
  const newUuid = uuid();
  uuidManager.init();
  uuidManager.push(newUuid);

  cellManager.change(index, {
    cell: cellGenerator.p(newUuid),
    text: "",
    tag: "p",
  });
  cellManager.deleteOption(index);
};

const newEmptyCell = (index, cellManager) => {
  const newUuid = uuid();
  uuidManager.push(newUuid, index);
  const newData = {
    cell: cellGenerator.p(newUuid),
    text: "",
    tag: "p",
  };
  cellManager.add(index, newData);
};

const sliceNewText = (cellManager, index, cursor) => {
  const originText = cellManager.texts[index];
  const currentText = originText ? originText.slice(0, cursor) : "";
  cellManager.change(index, { text: currentText });
  const newText = originText ? originText.slice(cursor) : "";

  return newText;
};

const newCell = (index, cellManager, dataObj) => {
  const { cursor } = dataObj;

  // uuid
  const newUuid = uuid();
  uuidManager.push(newUuid, index);

  // cell
  const cell = cellGenerator.p(newUuid);

  // 중간에서 enter
  const newText = sliceNewText(cellManager, index, cursor.start);

  const data = {
    cell,
    text: newText,
    tag: "p",
  };
  cellManager.add(index, data);

  // cursor
  const newCursor = {
    start: 0,
    end: 0,
  };

  // index
  const currentIndex = index + 1;

  return {
    cursor: newCursor,
    currentIndex,
  };
};

const newListCell = (index, cellManager, dataObj) => {
  const { cursor } = dataObj;
  const tag = cellManager.tags[index];
  const { start, depth } = cellManager.options[index];

  const isOrderedList = tag === "ol";

  // uuid
  const newUuid = uuid();
  uuidManager.push(newUuid, index);

  const newStart = isOrderedList ? start + 1 : null;
  const newDepth = depth;

  // cell
  const cell = cellGenerator[tag](newUuid);

  // index
  const newIndex = index + 1;

  // depth
  let newOption = null;
  if (isOrderedList) {
    newOption = { depth: newDepth, start: newStart };
  } else {
    newOption = { depth: newDepth };
  }
  cellManager.addOption(newIndex, newOption);

  // 중간에서 enter
  const newText = sliceNewText(cellManager, index, cursor.start);

  const data = {
    cell,
    text: newText,
    tag,
  };
  cellManager.add(index, data);

  // cursor
  const newCursor = {
    start: 0,
    end: 0,
  };

  return {
    cursor: newCursor,
    currentIndex: newIndex,
  };
};

const inputText = (cellUuid, cellManager, dataObj) => {
  const { text } = dataObj;
  const index = uuidManager.findIndex(cellUuid);
  cellManager.change(index, { text });
};

const deleteCell = (index, cellManager, dataObj) => {
  const { text } = dataObj;
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
  newEmptyCell,
  newCell,
  newListCell,
  inputText,
  deleteCell,
};

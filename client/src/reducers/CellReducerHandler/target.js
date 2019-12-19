import { uuidManager } from "../../utils";
import common from "./common";
import { cellGenerator } from "../../components/editor/cells/CellGenerator";

const { newEmptyCell } = common;

const transform = (cellUuid, cellManager, dataObj) => {
  const index = uuidManager.findIndex(cellUuid);
  const { cell, text, tag, depth, start } = dataObj;

  const data = {
    cell,
    text,
    tag,
  };

  cellManager.change(index, data);

  if (start === null && depth === null) cellManager.deleteOption(index);
  else cellManager.addOption(index, { depth, start });

  const cursor = {
    start: cellManager.texts[index].length,
    end: cellManager.texts[index].length,
  };

  if (tag === "code") {
    newEmptyCell(index, cellManager);
  }

  return {
    cursor,
  };
};

const reset = (index, cellManager) => {
  const uuidArray = uuidManager.getUuidArray();
  const targetUuid = uuidArray[index];
  cellManager.change(index, {
    cell: cellGenerator.p(targetUuid),
    tag: "p",
  });
};

export default {
  transform,
  reset,
};

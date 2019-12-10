import { uuidManager } from "../../utils";
import common from "./common";

const { newDefaultEmptyCell } = common;

const transform = (cellUuid, cellManager, dataObj) => {
  const index = uuidManager.findIndex(cellUuid);
  const { cell, text, tag, start } = dataObj;
  const data = {
    cell,
    text,
    tag,
  };
  cellManager.change(index, data);
  if (start === null) cellManager.deleteOption(index);
  else cellManager.addOption(index, { start });
  const cursor = {
    start: cellManager.texts[index].length,
    end: cellManager.texts[index].length,
  };

  if (tag === "code") {
    newDefaultEmptyCell(cellUuid, cellManager);
  }
  return {
    cursor,
  };
};

export default { transform };

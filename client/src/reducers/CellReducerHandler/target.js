import { uuidManager } from "../../utils";
import common from "./common";

const { newDefaultEmptyCell } = common;

const transform = (cellUuid, cellManager, dataObj) => {
  const index = uuidManager.findIndex(cellUuid);
  const { cell, text, tag } = dataObj;
  const data = {
    cell,
    text,
    tag,
  };
  cellManager.change(index, data);

  if (tag === "code") {
    newDefaultEmptyCell(cellUuid, cellManager);
  }
};

export default { transform };

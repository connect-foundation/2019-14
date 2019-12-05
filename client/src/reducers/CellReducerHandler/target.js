import { uuidManager } from "../../utils";

const transform = (cellUuid, cellManager, dataObj) => {
  const index = uuidManager.findIndex(cellUuid);
  const { cell, text, tag } = dataObj;
  const data = {
    cell,
    text,
    tag,
  };
  cellManager.change(index, data);
};

export default { transform };

import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellUuid, cellDispatch, componentCallback, tag, start) => {
  cellDispatch(cellActionCreator.new(cellUuid, componentCallback, tag, start));
};

const initCell = (cellUuid, cellDispatch, componentCallback) => {
  cellDispatch(cellActionCreator.init(componentCallback, cellUuid));
};

export { newCell, initCell };

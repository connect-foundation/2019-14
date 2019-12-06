import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellUuid, cellDispatch, componentCallback, tag) => {
  cellDispatch(cellActionCreator.new(cellUuid, componentCallback, tag));
};

const initCell = (cellUuid, cellDispatch, componentCallback) => {
  cellDispatch(cellActionCreator.init(componentCallback, cellUuid));
};

export { newCell, initCell };

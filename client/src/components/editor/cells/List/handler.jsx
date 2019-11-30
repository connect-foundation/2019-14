import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellDispatch, componentCallback, tag) => {
  cellDispatch(cellActionCreator.new(componentCallback, tag));
};

const initCell = (cellUuid, cellDispatch, componentCallback) => {
  cellDispatch(cellActionCreator.init(componentCallback, cellUuid));
};

export { newCell, initCell };

import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellUuid, cellDispatch, componentCallback, tag) => {
  cellDispatch(cellActionCreator.new(cellUuid, componentCallback, tag));
};

// eslint-disable-next-line import/prefer-default-export
export { newCell };

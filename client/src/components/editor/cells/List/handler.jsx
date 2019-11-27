import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellDispatch, componentCallback, tag) => {
  cellDispatch(cellActionCreator.new(componentCallback, tag));
};

export { newCell };

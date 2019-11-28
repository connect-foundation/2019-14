import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellDispatch, componentCallback, tag, start) => {
  cellDispatch(cellActionCreator.new(componentCallback, tag, start));
};

export { newCell };

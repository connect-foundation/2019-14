import { cellActionCreator } from "../../../../actions/CellAction";

const newCell = (cellDispatch) => {
  cellDispatch(cellActionCreator.new());
};

// eslint-disable-next-line import/prefer-default-export
export { newCell };

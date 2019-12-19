import { cellActionCreator } from "../../../../actions/CellAction";
import { cellGenerator } from "../CellGenerator";

const newCell = (cellDispatch) => {
  cellDispatch(cellActionCreator.newList());
};

const transformCell = (cellUuid, cellDispatch, text, tag, depth, start) => {
  const makeNewCell = cellGenerator[tag];

  const cell = makeNewCell(cellUuid);

  if (depth < 0) depth = 0;

  cellDispatch(
    cellActionCreator.transform(cellUuid, text, tag, cell, depth, start)
  );
};

export { newCell, transformCell };

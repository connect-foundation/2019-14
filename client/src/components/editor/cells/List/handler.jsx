import { cellActionCreator } from "../../../../actions/CellAction";
import { cellGenerator } from "../CellGenerator";

const newCell = (
  cellUuid,
  cellDispatch,
  componentCallback,
  tag,
  depth,
  start
) => {
  cellDispatch(
    cellActionCreator.new(cellUuid, componentCallback, tag, depth, start)
  );
};

const initCell = (cellUuid, cellDispatch, componentCallback) => {
  cellDispatch(cellActionCreator.init(componentCallback, cellUuid));
};

const transformCell = (cellUuid, cellDispatch, text, tag, depth, start) => {
  const makeNewCell = cellGenerator[tag];

  const cell = makeNewCell(cellUuid);

  if (depth < 0) depth = 0;

  cellDispatch(
    cellActionCreator.transform(cellUuid, text, tag, cell, depth, start)
  );
};

export { newCell, initCell, transformCell };

import { uuidManager } from "../../utils";
import common from "./common";

const selectAllBlock = (lastCellIndex) => {
  const block = {
    start: 0,
    end: lastCellIndex,
  };
  const currentIndex = lastCellIndex;

  return {
    block,
    currentIndex,
  };
};

const blockRangeUp = (index, block) => {
  const newStart = block.start !== null ? block.start : index;
  let newEnd = null;
  if (block.end > 0) {
    newEnd = block.end - 1;
  } else if (block.end === 0) {
    newEnd = 0;
  } else {
    newEnd = newStart;
  }

  const newBlock = {
    start: newStart,
    end: newEnd,
  };

  return {
    block: newBlock,
    currentIndex: newEnd,
  };
};

const blockRangeDown = (index, block, cellLength) => {
  const newStart = block.start !== null ? block.start : index;
  let newEnd = null;

  if (block.end === null) {
    newEnd = index;
  } else if (block.end < cellLength - 1) {
    newEnd = block.end + 1;
  } else if (block.end === cellLength - 1) {
    newEnd = cellLength - 1;
  }

  const newBlock = {
    start: newStart,
    end: newEnd,
  };

  return {
    block: newBlock,
    currentIndex: newEnd,
  };
};

const blockDelete = (cellManager, dataObj) => {
  const { block } = dataObj;
  const blockStart = block.start < block.end ? block.start : block.end;
  const blockEnd = block.start > block.end ? block.start : block.end;

  const flag = {
    cell: true,
    text: true,
    tag: true,
  };
  cellManager.popArray(blockStart, blockEnd, flag);
  uuidManager.blockDelete(blockStart, blockEnd);

  const emptyBlock = {
    start: null,
    end: null,
  };
  const currentIndex = blockStart - 1 < 0 ? blockStart : blockStart - 1;
  const { texts } = cellManager;
  const cursor = {
    start: texts[currentIndex] ? texts[currentIndex].length : 0,
    end: texts[currentIndex] ? texts[currentIndex].length : 0,
  };

  if (cellManager.cells.length === 0) {
    common.initCell(cellManager);
  }

  return {
    cursor,
    currentIndex,
    block: emptyBlock,
  };
};

export default {
  selectAllBlock,
  blockRangeUp,
  blockRangeDown,
  blockDelete,
};

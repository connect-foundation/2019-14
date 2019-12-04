import { uuidManager } from "../../utils";

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

  return {
    cursor,
    currentIndex,
    block: emptyBlock,
  };
};

export default {
  blockDelete,
};

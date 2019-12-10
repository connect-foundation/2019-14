import { uuid } from "uuidv4";

import { cellGenerator } from "../../components/editor/cells/CellGenerator";
import { uuidManager } from "../../utils";

const copy = (cellManager, block) => {
  const blockStart = block.start < block.end ? block.start : block.end;
  const blockEnd = block.start > block.end ? block.start : block.end;
  const { texts, tags } = cellManager;

  const clipboard = {
    texts: texts.slice(blockStart, blockEnd + 1),
    tags: tags.slice(blockStart, blockEnd + 1),
  };

  return {
    clipboard,
  };
};

const paste = (index, cellManager, dataObj) => {
  const { clipboard } = dataObj;

  const currentIndex = index + clipboard.texts.length;

  const cbCells = clipboard.tags.reduce((acc, val, i) => {
    /**
     * @todo ordered list일 경우 추가하기
     */
    const newUuid = uuid();
    uuidManager.push(newUuid, index + i);
    acc.push(cellGenerator[val](newUuid));
    return acc;
  }, []);

  const data = {
    cells: cbCells,
    texts: clipboard.texts,
    tags: clipboard.tags,
  };
  cellManager.pushArray(index, data);

  const pos = cellManager.texts[currentIndex].length;
  const cursor = {
    start: pos,
    end: pos,
  };

  return {
    cursor,
  };
};

export default {
  copy,
  paste,
};

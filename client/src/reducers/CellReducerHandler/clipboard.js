import { uuid } from "uuidv4";

import { cellGenerator } from "../../components/editor/cells/CellGenerator";
import { uuidManager } from "../../utils";

const copy = (cellManager, block) => {
  const blockStart = block.start < block.end ? block.start : block.end;
  const blockEnd = block.start > block.end ? block.start : block.end;
  const { texts, tags, options } = cellManager;

  const clipboard = {
    texts: texts.slice(blockStart, blockEnd + 1),
    tags: tags.slice(blockStart, blockEnd + 1),
    options: options.slice(blockStart, blockEnd + 1),
  };

  navigator.clipboard.writeText(clipboard.texts.join("\n"));

  return {
    clipboard,
  };
};

const paste = (index, cellManager, dataObj) => {
  const { clipboard } = dataObj;
  const currentIndex = index + clipboard.texts.length;

  const cbCells = clipboard.tags.reduce((acc, val, i) => {
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

  if (clipboard.options) {
    clipboard.options.forEach((opt, i) => {
      if (opt) cellManager.addOption(index + i + 1, opt);
    });
  }

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

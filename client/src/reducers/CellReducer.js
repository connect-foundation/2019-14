import createDebug from "debug";
import { uuid } from "uuidv4";
import { CELL_ACTION } from "../actions/CellAction";
import { utils } from "../utils";
import { cellGenerator } from "../components/editor/cells/CellGenerator";

const debug = createDebug("boost:reducer:cell");

const { splice } = utils;

const cellReducerHandler = {
  [CELL_ACTION.INIT]: (state, action) => {
    const { cellUuid, createMarkdownCell, tag } = action;
    const { uuidManager } = state;
    const newUuid = cellUuid || uuid();
    const index = cellUuid ? uuidManager.findIndex(cellUuid) : 0;

    if (!cellUuid) {
      uuidManager.push(newUuid);
    }
    const cells = splice.change(
      state.cells,
      index,
      createMarkdownCell(newUuid)
    );
    const texts = splice.change(state.texts, index, "");
    const tags = splice.change(state.tags, index, tag);

    const nextState = {
      ...state,
      cells,
      texts,
      tags,
    };

    debug("Init cell next state", nextState);

    return nextState;
  },

  [CELL_ACTION.NEW]: (state, action) => {
    const { uuidManager, start } = state;
    const { cellUuid, createMarkdownCell, tag } = action;
    const index = uuidManager.findIndex(cellUuid);
    const newCellUuid = uuid();
    uuidManager.push(newCellUuid, index);

    const isOrderedList = tag === "ol";
    const newStart = isOrderedList ? start + 1 : null;
    const component = isOrderedList
      ? createMarkdownCell(newCellUuid, newStart)
      : createMarkdownCell(newCellUuid);

    const cells = splice.add(state.cells, index, component);

    const originText = state.texts[index];
    const { cursor } = state;
    const currentText = originText ? originText.slice(0, cursor.start) : "";
    const newText = originText ? originText.slice(cursor.start) : "";
    let texts = splice.change(state.texts, index, currentText);
    texts = splice.add(texts, index, newText);
    const tags = splice.add(state.tags, index, tag);

    const newCursor = {
      start: 0,
      end: 0,
    };

    const currentIndex = index + 1;

    const nextState = {
      ...state,
      currentIndex,
      cells,
      texts,
      tags,
      cursor: newCursor,
      start: newStart,
    };

    debug("New cell", nextState);

    return nextState;
  },

  [CELL_ACTION.INPUT]: (state, action) => {
    const { uuidManager } = state;
    const { text, cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);
    const texts = splice.change(state.texts, index, text);

    debug("Cell Change text", index, text);

    return {
      ...state,
      texts,
    };
  },

  [CELL_ACTION.DELETE]: (state, action) => {
    const { uuidManager, block } = state;
    const { cellUuid, text } = action;

    if (block.start !== null) {
      const blockStart = block.start < block.end ? block.start : block.end;
      const blockEnd = block.start > block.end ? block.start : block.end;

      const cells = splice.popArray(state.cells, blockStart, blockEnd);
      const texts = splice.popArray(state.texts, blockStart, blockEnd);
      const tags = splice.popArray(state.tags, blockStart, blockEnd);
      uuidManager.blockDelete(blockStart, blockEnd);

      const emptyBlock = {
        start: null,
        end: null,
      };
      const currentIndex = blockStart - 1 < 0 ? blockStart : blockStart - 1;
      const cursor = {
        start: texts[currentIndex] ? texts[currentIndex].length : 0,
        end: texts[currentIndex] ? texts[currentIndex].length : 0,
      };

      const nextState = {
        ...state,
        cells,
        texts,
        tags,
        cursor,
        block: emptyBlock,
        currentIndex,
      };

      debug("Cell delete", nextState);

      return nextState;
    }

    const index = uuidManager.findIndex(cellUuid);
    uuidManager.pop(index);

    const prevIndex = index - 1;
    const cells = splice.delete(state.cells, index);

    const cursor = {
      start: prevIndex >= 0 ? state.texts[prevIndex].length : 0,
      end: prevIndex >= 0 ? state.texts[prevIndex].length : 0,
    };

    let texts = splice.delete(state.texts, index);
    const joinedText = state.texts[prevIndex] + text;
    texts = splice.change(texts, prevIndex, joinedText);

    const tags = splice.delete(state.tags, index);

    return {
      ...state,
      cells,
      texts,
      tags,
      currentIndex: prevIndex,
      cursor,
    };
  },

  [CELL_ACTION.FOCUS.PREV]: (state) => {
    const block = {
      start: null,
      end: null,
    };
    const { currentIndex } = state;
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;

    debug(`Cell focus prev ${currentIndex} to ${nextIndex}`);

    return {
      ...state,
      currentIndex: nextIndex,
      block,
    };
  },

  [CELL_ACTION.FOCUS.NEXT]: (state) => {
    const block = {
      start: null,
      end: null,
    };
    const { currentIndex } = state;
    const nextIndex =
      currentIndex < state.cells.length - 1 ? currentIndex + 1 : currentIndex;

    debug(`Cell focus prev ${currentIndex} to ${nextIndex}`);

    return {
      ...state,
      currentIndex: nextIndex,
      block,
    };
  },

  [CELL_ACTION.FOCUS.MOVE]: (state, { cellUuid }) => {
    const { uuidManager } = state;
    const index = uuidManager.findIndex(cellUuid);

    const block = {
      start: null,
      end: null,
    };

    return {
      ...state,
      currentIndex: index,
      block,
    };
  },

  [CELL_ACTION.FOCUS.ATTACH]: (state, action) => {
    return {
      ...state,
      inputRef: action.inputRef,
    };
  },

  [CELL_ACTION.TARGET.TRANSFORM]: (state, action) => {
    const { cellUuid, text, tag, cell, start } = action;
    const { uuidManager } = state;
    const index = uuidManager.findIndex(cellUuid);

    const texts = splice.change(state.texts, index, text);
    const tags = splice.change(state.tags, index, tag);
    const cells = splice.change(state.cells, index, cell);

    return {
      ...state,
      texts,
      tags,
      cells,
      start,
    };
  },

  [CELL_ACTION.BLOCK.ALL]: (state) => {
    const block = {
      start: 0,
      end: state.cells.length - 1,
    };
    const currentIndex = state.cells.length - 1;

    return {
      ...state,
      block,
      currentIndex,
    };
  },

  [CELL_ACTION.BLOCK.UP]: (state, action) => {
    const { uuidManager, block } = state;
    const { cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);

    const newStart = block.start || index;
    let newEnd = block.end > 0 ? block.end - 1 : newStart;
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
      ...state,
      block: newBlock,
      currentIndex: newEnd,
    };
  },

  [CELL_ACTION.BLOCK.DOWN]: (state, action) => {
    const { uuidManager, block, cells } = state;
    const { cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);

    const { length } = cells;

    const newStart = block.start !== null ? block.start : index;
    let newEnd = null;
    if (block.end < length - 1) {
      newEnd = block.end + 1;
    } else if (block.end === length - 1) {
      newEnd = length - 1;
    } else {
      newEnd = newStart;
    }

    const newBlock = {
      start: newStart,
      end: newEnd,
    };

    return {
      ...state,
      block: newBlock,
      currentIndex: newEnd,
    };
  },

  [CELL_ACTION.CURSOR.MOVE]: (state, action) => {
    const cursor = {
      start: action.selectionStart,
      end: action.selectionEnd,
    };

    return {
      ...state,
      cursor,
    };
  },

  [CELL_ACTION.CLIPBOARD.COPY]: (state) => {
    const { texts, tags, block } = state;

    if (!block.start) {
      return state;
    }
    const blockStart = block.start < block.end ? block.start : block.end;
    const blockEnd = block.start > block.end ? block.start : block.end;

    const clipboard = {
      texts: texts.slice(blockStart, blockEnd + 1),
      tags: tags.slice(blockStart, blockEnd + 1),
    };
    return {
      ...state,
      clipboard,
    };
  },

  [CELL_ACTION.CLIPBOARD.PASTE]: (state, action) => {
    const { uuidManager, clipboard } = state;
    const { cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);

    const currentIndex = state.currentIndex + clipboard.texts.length;

    const cbCells = clipboard.tags.reduce((acc, val, i) => {
      /**
       * @todo ordered list일 경우 추가하기
       */
      const newUuid = uuid();
      uuidManager.push(newUuid, index + i);
      acc.push(cellGenerator[val](newUuid));
      return acc;
    }, []);

    const cells = splice.pushArray(state.cells, index, cbCells);
    const texts = splice.pushArray(state.texts, index, clipboard.texts);
    const tags = splice.pushArray(state.tags, index, clipboard.tags);

    const cursor = {
      start: texts[currentIndex].length,
      end: texts[currentIndex].length,
    };

    const block = {
      start: null,
      end: null,
    };

    return {
      ...state,
      cells,
      texts,
      tags,
      cursor,
      block,
    };
  },
};

const cellReducer = (state, action) => {
  const handler = cellReducerHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  return handler(state, action);
};

export default cellReducer;

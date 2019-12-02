import { uuid } from "uuidv4";
import { CELL_ACTION } from "../actions/CellAction";
import { utils } from "../utils";

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

    return {
      ...state,
      cells,
      texts,
      tags,
    };
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
    const currentText = originText.slice(0, cursor.start);
    const newText = originText.slice(cursor.start);
    let texts = splice.change(state.texts, index, currentText);
    texts = splice.add(texts, index, newText);
    const tags = splice.add(state.tags, index, tag);

    const newCursor = {
      start: 0,
      end: 0,
    };

    const currentIndex = index + 1;

    return {
      ...state,
      currentIndex,
      cells,
      texts,
      tags,
      cursor: newCursor,
      start: newStart,
    };
  },

  [CELL_ACTION.INPUT]: (state, action) => {
    const { uuidManager } = state;
    const { text, cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);
    const texts = splice.change(state.texts, index, text);

    return {
      ...state,
      texts,
    };
  },

  [CELL_ACTION.DELETE]: (state, action) => {
    const { uuidManager } = state;
    const { cellUuid, text } = action;
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
    texts = splice.change(state.texts, prevIndex, joinedText);

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
    return {
      ...state,
      currentIndex: state.currentIndex - 1,
      block,
    };
  },

  [CELL_ACTION.FOCUS.NEXT]: (state) => {
    const block = {
      start: null,
      end: null,
    };
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
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
    };
  },

  [CELL_ACTION.BLOCK.DOWN]: (state, action) => {
    const { uuidManager, block, cells } = state;
    const { cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);

    const { length } = cells;

    const newStart = block.start || index;
    let newEnd = block.end < length - 1 ? block.end + 1 : newStart;
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
};

const cellReducer = (state, action) => {
  const handler = cellReducerHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  return handler(state, action);
};

export default cellReducer;

import { uuid } from "uuidv4";
import { CELL_ACTION } from "../actions/CellAction";
import { utils } from "../utils";

const { splice } = utils;

const cellReducerHandler = {
  [CELL_ACTION.INIT]: (state, action) => {
    const { index, createMarkdownCell } = action;
    const { uuidManager } = state;
    const cellUuid = uuid();
    uuidManager.push(cellUuid);
    const cells = splice.change(
      state.cells,
      index,
      createMarkdownCell(cellUuid)
    );
    const texts = splice.change(state.texts, index, "");
    const tags = splice.change(state.tags, index, action.tag);

    return {
      ...state,
      cells,
      texts,
      tags,
    };
  },

  [CELL_ACTION.NEW]: (state, action) => {
    const { currentIndex, uuidManager } = state;
    const { createMarkdownCell, start } = action;
    const cellUuid = uuid();

    const cells = splice.add(
      state.cells,
      currentIndex,
      createMarkdownCell(cellUuid)
    );
    const texts = splice.add(state.texts, currentIndex, "");
    const tags = splice.add(state.tags, currentIndex, action.tag);
    uuidManager.uuidArray = splice.add(
      uuidManager.uuidArray,
      currentIndex,
      cellUuid
    );

    return {
      ...state,
      currentIndex: currentIndex + 1,
      cells,
      texts,
      tags,
      start,
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

  [CELL_ACTION.FOCUS.PREV]: (state) => {
    return {
      ...state,
      currentIndex: state.currentIndex - 1,
    };
  },

  [CELL_ACTION.FOCUS.NEXT]: (state) => {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  },

  [CELL_ACTION.FOCUS.MOVE]: (state, { cellUuid }) => {
    const { uuidManager } = state;
    const index = uuidManager.findIndex(cellUuid);

    return {
      ...state,
      currentIndex: index,
    };
  },

  [CELL_ACTION.FOCUS.ATTACH]: (state, action) => {
    return {
      ...state,
      inputRef: action.inputRef,
    };
  },

  [CELL_ACTION.TARGET.TRANSFORM]: (state, action) => {
    const { index, text, tag, cell, start } = action;

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

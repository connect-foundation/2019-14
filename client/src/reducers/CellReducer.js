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
    const { currentIndex, uuidManager, start } = state;
    const { createMarkdownCell, tag } = action;
    const cellUuid = uuid();

    const isOrderedList = tag === "ol";
    const newStart = isOrderedList ? start + 1 : null;
    const component = isOrderedList
      ? createMarkdownCell(cellUuid, newStart)
      : createMarkdownCell(cellUuid);

    const cells = splice.add(state.cells, currentIndex, component);
    const texts = splice.add(state.texts, currentIndex, "");
    const tags = splice.add(state.tags, currentIndex, tag);

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

  /**
   * @todo
   * new에서 start를 받는데 이건 어떻게 해야하는지 준환님이랑 상의하기
   */
  [CELL_ACTION.DELETE]: (state, action) => {
    const { uuidManager } = state;
    const { cellUuid } = action;
    const index = uuidManager.findIndex(cellUuid);

    const cells = splice.delete(state.cells, index);
    const texts = splice.delete(state.texts, index);
    const tags = splice.delete(state.tags, index);
    uuidManager.uuidArray = splice.delete(uuidManager.uuidArray, index);
    const cursor = {
      start: index - 1 >= 0 ? texts[index - 1].length : 0,
      end: index - 1 >= 0 ? texts[index - 1].length : 0,
    };
    const currentIndex = index - 1;

    return {
      ...state,
      cells,
      texts,
      tags,
      currentIndex,
      cursor,
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

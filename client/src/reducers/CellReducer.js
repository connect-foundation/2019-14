import { uuid } from "uuidv4";
import { CELL_ACTION } from "../actions/CellAction";
import { utils } from "../utils";

const { splice } = utils;

const cellReducerHandler = {
  [CELL_ACTION.INIT]: (state, action) => {
    const { index, renderTarget } = action;
    const { uuidManager } = state;
    const cellUuid = uuid();
    uuidManager.push(cellUuid);
    const cells = splice.change(state.cells, index, renderTarget(cellUuid));
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
    const { renderTarget } = action;
    const cellUuid = uuid();

    const cells = splice.add(state.cells, currentIndex, renderTarget(cellUuid));
    const texts = splice.add(state.texts, currentIndex, "");
    const tags = splice.add(state.tags, currentIndex, action.tag);
    uuidManager.uuidArray = splice.add(
      uuidManager.uuidArray,
      currentIndex,
      cellUuid
    );

    return {
      ...state,
      cells,
      texts,
      tags,
    };
  },

  [CELL_ACTION.INPUT]: (state, action) => {
    const { currentIndex } = state;
    const texts = splice.change(state.texts, currentIndex, action.text);

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

  [CELL_ACTION.FOCUS.MOVE]: (state, { index }) => {
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
    const { index, text, tag } = action;

    const texts = splice.change(state.texts, index, text);
    const tags = splice.change(state.tags, index, tag);

    return {
      ...state,
      texts,
      tags,
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

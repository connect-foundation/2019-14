import { uuid } from "uuidv4";
import { CELL_ACTION } from "../actions/CellAction";
import { utils } from "../utils";

const cellReducerHandler = {
  [CELL_ACTION.INIT]: (state, action) => {
    const { index, renderTarget } = action;
    const { uuidManager } = state;
    const cellUuid = uuid();
    uuidManager.push(cellUuid);
    const cells = utils.splice.change(
      state.cells,
      index,
      renderTarget(cellUuid)
    );
    const texts = utils.splice.change(state.texts, index, "");

    return {
      ...state,
      cells,
      texts,
    };
  },

  [CELL_ACTION.NEW]: (state, action) => {
    const { currentIndex, uuidManager } = state;
    const { renderTarget } = action;
    const cellUuid = uuid();

    const cells = utils.splice.add(
      state.cells,
      currentIndex,
      renderTarget(cellUuid)
    );
    const texts = utils.splice.add(state.texts, currentIndex, "");
    uuidManager.uuidArray = utils.splice.add(
      uuidManager.uuidArray,
      currentIndex,
      cellUuid
    );

    return {
      ...state,
      cells,
      texts,
    };
  },

  [CELL_ACTION.INPUT]: (state, action) => {
    const { currentIndex } = state;
    const texts = utils.splice.change(state.texts, currentIndex, action.text);

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
    const { index } = action;
    const cells = utils.splice.change(state.cells, index, action.renderTarget);
    const texts = utils.splice.change(state.texts, index, action.text);

    return {
      ...state,
      cells,
      texts,
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

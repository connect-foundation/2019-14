import { CELL_ACTION } from "../actions/CellAction";

const cellReducerHandler = {
  [CELL_ACTION.NEW]: (state, action) => {
    const currentIndex = state.currentIndex > 0 ? state.currentIndex : 0;
    const cells =
      state.cells.length > 0
        ? [
            ...state.cells.slice(0, currentIndex + 1),
            action.renderTarget,
            ...state.cells.slice(currentIndex + 1, state.cells.length),
          ]
        : [action.renderTarget];
    const texts =
      state.texts.length > 0
        ? [
            ...state.texts.slice(0, currentIndex + 1),
            "",
            ...state.texts.slice(currentIndex + 1, state.texts.length),
          ]
        : [""];
    return {
      ...state,
      cells,
      texts,
    };
  },

  [CELL_ACTION.INIT]: (state, action) => {
    const { index } = action;
    const texts =
      state.texts.length > 0
        ? [
            ...state.texts.slice(0, index),
            action.text,
            ...state.texts.slice(index + 1, state.texts.length),
          ]
        : [""];
    return {
      ...state,
      texts,
    };
  },

  [CELL_ACTION.INPUT]: (state, action) => {
    const { currentIndex } = state;
    const texts =
      state.texts.length > 0
        ? [
            ...state.texts.slice(0, currentIndex),
            action.text,
            ...state.texts.slice(currentIndex + 1, state.texts.length),
          ]
        : [""];
    return {
      ...state,
      texts,
    };
  },

  [CELL_ACTION.TARGET.PREV]: (state) => {
    return {
      ...state,
      currentIndex: state.currentIndex - 1,
    };
  },

  [CELL_ACTION.TARGET.NEXT]: (state) => {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  },

  [CELL_ACTION.TARGET.TRANSFORM]: (state, action) => {
    const { currentIndex } = action;
    const cells = [
      ...state.cells.slice(0, currentIndex),
      action.renderTarget,
      ...state.cells.slice(currentIndex + 1, state.cells.length),
    ];
    const texts = [
      ...state.texts.slice(0, currentIndex),
      action.text,
      ...state.texts.slice(currentIndex + 1, state.texts.length),
    ];
    return {
      ...state,
      cells,
      texts,
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

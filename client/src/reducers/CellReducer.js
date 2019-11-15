import { CELL_ACTION } from "../actions/CellAction";

const cellReducerHandler = {
  [CELL_ACTION.NEW]: (state, action) => {
    const { currentIndex } = state;
    const cells =
      state.cells.length > 0
        ? [
            ...state.cells.slice(0, currentIndex + 1),
            action.renderTarget,
            ...state.cells.slice(currentIndex + 1, state.cells.length),
          ]
        : [action.renderTarget];
    return {
      ...state,
      cells,
    };
  },

  [CELL_ACTION.INIT]: (state, action) => {
    return {
      text: action.text || "",
      renderTarget: action.renderTarget,
    };
  },

  [CELL_ACTION.SAVE]: (state, action) => {
    return {
      ...state,
      selectedTarget: action.selectedTarget,
    };
  },

  [CELL_ACTION.CHANGE]: (state, action) => {
    return {
      ...state,
      selectedTarget: action.selectedTarget,
    };
  },

  [CELL_ACTION.TRANSFORM]: (state, action) => {
    return {
      ...state,
      renderTarget: action.renderTarget,
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

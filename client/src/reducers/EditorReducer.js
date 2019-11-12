import { EDITOR_ACTION } from "../actions/EditorAction";

const editorReducerHandler = {
  [EDITOR_ACTION.INIT]: (state, action) => {
    return {
      ...state,
      data: action.data,
    };
  },

  [EDITOR_ACTION.UPDATE]: (state, action) => {
    return {
      ...state,
      data: action.data,
    };
  },
};

const editorReducer = (state, action) => {
  const handler = editorReducerHandler[action.type];
  if (handler === undefined) {
    return state;
  }
  return handler(state, action);
};

export { editorReducer };

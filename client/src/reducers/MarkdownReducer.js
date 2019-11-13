import { MARKDOWN_ACTION } from "../actions/MarkdownAction";

const markdownReducerHandler = {
  [MARKDOWN_ACTION.INIT]: (state, action) => {
    return {
      text: action.text || "",
      renderTarget: action.renderTarget || null,
    };
  },

  [MARKDOWN_ACTION.TRANSFORM]: (state, action) => {
    return {
      ...state,
      renderTarget: action.renderTarget,
    };
  },

  [MARKDOWN_ACTION.INPUT]: (state, action) => {
    return {
      ...state,
      text: action.text,
    };
  },
};

const markdownReducer = (state, action) => {
  const handler = markdownReducerHandler[action.type];

  if (handler === undefined) {
    return state;
  }

  return handler(state, action);
};

export default markdownReducer;

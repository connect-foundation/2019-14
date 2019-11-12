const MARKDOWN_ACTION = {
  INIT: "markdown/init",
  TRANSFORM: "markdown/transform",
  INPUT: "markdown/input",
};

const markdownActionCreator = {
  init(text) {
    return {
      type: MARKDOWN_ACTION.INIT,
      renderTarget: null,
      text,
    };
  },

  transform(renderTarget) {
    return {
      type: MARKDOWN_ACTION.TRANSFORM,
      renderTarget,
    };
  },

  input(text) {
    return {
      type: MARKDOWN_ACTION.INPUT,
      text,
    };
  },
};

export { MARKDOWN_ACTION, markdownActionCreator };

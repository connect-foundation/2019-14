const EDITOR_ACTION = {
  INIT: "editor/init",
  UPDATE: "editor/update",
};

const editorActionCreator = {
  init(data) {
    return {
      type: EDITOR_ACTION.INIT,
      data,
    };
  },

  update(data) {
    return {
      type: EDITOR_ACTION.UPDATE,
      data,
    };
  },
};

export { EDITOR_ACTION, editorActionCreator };

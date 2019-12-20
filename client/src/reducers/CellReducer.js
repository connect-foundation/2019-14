import createDebug from "debug";
import { CELL_ACTION } from "../actions/CellAction";
import {
  common,
  focus,
  block,
  target,
  clipboard,
  toolbar,
} from "./CellReducerHandler";

const debug = createDebug("boost:reducer:cell");

const cellReducerHandler = {
  [CELL_ACTION.INIT]: (state) => {
    common.initCell(state.cellManager);

    debug("Init cell next state", state.cellManager);

    return {
      ...state,
      cellManager: state.cellManager,
    };
  },

  [CELL_ACTION.NEW]: (state) => {
    const { currentIndex, cursor, cellManager } = state;

    const result = common.newCell(currentIndex, cellManager, {
      cursor,
    });

    const nextState = {
      ...state,
      ...result,
    };

    debug("New cell", nextState);

    return nextState;
  },

  [CELL_ACTION.NEW_LIST]: (state) => {
    const { currentIndex, cellManager, cursor } = state;
    const result = common.newListCell(currentIndex, cellManager, { cursor });

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.NEW_EMPTY]: (state) => {
    const { cellManager, currentIndex } = state;

    common.newEmptyCell(currentIndex, cellManager);

    return {
      ...state,
      currentIndex: currentIndex + 1,
    };
  },

  [CELL_ACTION.INPUT]: (state, action) => {
    const { cellManager } = state;
    const { cellUuid, text } = action;
    const result = common.inputText(cellUuid, cellManager, { text });

    debug("Cell Change text", cellManager);

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.DELETE]: (state, action) => {
    const { currentIndex, cellManager } = state;
    const { text } = action;

    const result = common.deleteCell(currentIndex, cellManager, { text });

    debug("Cell delete", result);

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.FOCUS.PREV]: (state) => {
    const { currentIndex } = state;
    const nextIndex = focus.prev(currentIndex);

    debug(`Cell focus prev ${currentIndex} to ${nextIndex}`);

    return {
      ...state,
      currentIndex: nextIndex,
    };
  },

  [CELL_ACTION.FOCUS.NEXT]: (state) => {
    const { currentIndex, cellManager } = state;
    const nextIndex = focus.next(currentIndex, cellManager.cells.length);

    debug(`Cell focus next ${currentIndex} to ${nextIndex}`);

    return {
      ...state,
      currentIndex: nextIndex,
    };
  },

  [CELL_ACTION.FOCUS.MOVE]: (state, { cellUuid }) => {
    const { cellManager } = state;

    const result = focus.move(cellUuid, cellManager);

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.FOCUS.ATTACH]: (state, action) => {
    return {
      ...state,
      inputRef: action.inputRef,
    };
  },

  [CELL_ACTION.TARGET.TRANSFORM]: (state, action) => {
    const { cellUuid, cell, text, tag, depth, start } = action;
    const result = target.transform(cellUuid, state.cellManager, {
      cell,
      text,
      tag,
      depth,
      start,
    });

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.TARGET.RESET]: (state) => {
    const { currentIndex, cellManager } = state;
    target.reset(currentIndex, cellManager);

    return {
      ...state,
    };
  },

  [CELL_ACTION.BLOCK.ALL]: (state) => {
    const { cells } = state.cellManager;
    const result = block.selectAllBlock(cells.length - 1);

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.BLOCK.UP]: (state) => {
    const result = block.blockRangeUp(state.currentIndex, state.block);
    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.BLOCK.DOWN]: (state) => {
    const { cells } = state.cellManager;
    const result = block.blockRangeDown(
      state.currentIndex,
      state.block,
      cells.length
    );

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.BLOCK.RELEASE]: (state) => {
    const emptyBlock = {
      start: null,
      end: null,
    };
    return {
      ...state,
      block: emptyBlock,
    };
  },

  [CELL_ACTION.BLOCK.DELETE]: (state) => {
    const { cellManager } = state;

    const result = block.blockDelete(cellManager, { block: state.block });

    debug("Cells delete for Block", result);

    return {
      ...state,
      ...result,
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

  [CELL_ACTION.CLIPBOARD.COPY]: (state) => {
    if (state.block.start === null) {
      return state;
    }
    const result = clipboard.copy(state.cellManager, state.block);
    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.CLIPBOARD.PASTE]: (state) => {
    const { cellManager, currentIndex } = state;

    const dataObj = {
      clipboard: state.clipboard,
    };
    const result = clipboard.paste(currentIndex, cellManager, dataObj);

    return {
      ...state,
      ...result,
    };
  },

  [CELL_ACTION.TOOLBAR.SAVE]: (state) => {
    const { cellManager } = state;

    toolbar.save(cellManager);

    return state;
  },

  [CELL_ACTION.TOOLBAR.LOAD]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  [CELL_ACTION.TOOLBAR.LOAD_FINISH]: (state) => {
    return {
      ...state,
      isLoading: false,
    };
  },

  [CELL_ACTION.TOOLBAR.SHARE_LOAD]: (state) => {
    return {
      ...state,
      isShared: true,
      isLoading: true,
    };
  },

  [CELL_ACTION.TOOLBAR.SHARE_LOAD_FINISH]: (state) => {
    return {
      ...state,
      isLoading: false,
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

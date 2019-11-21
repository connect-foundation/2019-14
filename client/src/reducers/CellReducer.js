import uuid from "uuidv4";
import { CELL_ACTION } from "../actions/CellAction";

const splice = {
  /**
   * @param {Array} array 데이터를 끼워넣을 배열
   * @param {Number} cur 현재 인덱스
   * @param {any} data 현재 인덱스 다음에 끼워넣을 데이터
   * @returns {Array} 데이터가 추가된 배열
   */
  add: (array, cur, data) => {
    if (array.length > 0) {
      return [
        ...array.slice(0, cur + 1),
        data,
        ...array.slice(cur + 1, array.length),
      ];
    }
    return [data];
  },
  /**
   * @param {Array} array 데이터를 변경할 배열
   * @param {Number} cur 현재 인덱스
   * @param {any} data 변경할 데이터
   * @returns {Array} 데이터가 변경된 배열
   */
  change: (array, cur, data) => {
    if (array.length > 0) {
      return [
        ...array.slice(0, cur),
        data,
        ...array.slice(cur + 1, array.length),
      ];
    }
    return [data];
  },
};

let cellUuidArray = [];
const findIndexByCellUuid = (targetUuid) => {
  const index = cellUuidArray.findIndex((cellUuid) => cellUuid === targetUuid);
  return index;
};

const cellReducerHandler = {
  [CELL_ACTION.INIT]: (state, action) => {
    const { index, renderTarget } = action;
    const cellUuid = uuid();
    cellUuidArray.push(cellUuid);
    const cells = splice.change(state.cells, index, renderTarget(cellUuid));
    const texts = splice.change(state.texts, index, "");

    return {
      ...state,
      cells,
      texts,
    };
  },

  [CELL_ACTION.NEW]: (state, action) => {
    const { currentIndex } = state;
    const { renderTarget } = action;
    const cellUuid = uuid();
    const cells = splice.add(state.cells, currentIndex, renderTarget(cellUuid));
    const texts = splice.add(state.texts, currentIndex, "");
    cellUuidArray = splice.add(cellUuidArray, currentIndex, cellUuid);

    return {
      ...state,
      cells,
      texts,
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
    const { index } = action;
    const cells = splice.change(state.cells, index, action.renderTarget);
    const texts = splice.change(state.texts, index, action.text);

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

import { CELL_ACTION } from "../actions/CellAction";

const arrayInterceptor = {
  /**
   * @param {Array} array 데이터를 끼워넣을 배열
   * @param {Number} cur 현재 인덱스
   * @param {any} data 끼워넣을 데이터
   * @returns {Array} 데이터가 추가된 배열
   */
  ADD: (array, cur, data) => {
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
  CHANGE: (array, cur, data) => {
    if (array.length > 0) {
      return [
        ...array.slice(0, cur),
        data,
        ...array.slice(cur + 1, array.length),
      ];
    }
    return [""];
  },
};

const cellReducerHandler = {
  [CELL_ACTION.NEW]: (state, action) => {
    const currentIndex = state.currentIndex > 0 ? state.currentIndex : 0;
    const cells = arrayInterceptor.ADD(
      state.cells,
      currentIndex,
      action.renderTarget
    );
    const texts = arrayInterceptor.ADD(state.texts, currentIndex, "");

    return {
      ...state,
      cells,
      texts,
    };
  },

  /**
   * @todo init의 역할 변경 및 확정시키기
   * - 지정 인덱스의 셀을 맨 처음 디폴트 인풋 태그로 초기화시킨다.
   */
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
    const texts = arrayInterceptor.CHANGE(
      state.texts,
      currentIndex,
      action.text
    );

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
    const cells = arrayInterceptor.CHANGE(
      state.cells,
      currentIndex,
      action.renderTarget
    );
    const texts = arrayInterceptor.CHANGE(
      state.texts,
      currentIndex,
      action.text
    );

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

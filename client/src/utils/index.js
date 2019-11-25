import UuidManager from "./UuidManager";
import HandlerManager from "./HandlerManager";

const utils = {};
utils.splice = {
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

export { utils, UuidManager, HandlerManager };

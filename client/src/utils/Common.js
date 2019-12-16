const utils = {};

utils.splice = {
  /**
   * @param {Array} array 데이터를 끼워넣을 배열
   * @param {Number} cur 현재 인덱스
   * @param {any} data 현재 인덱스 다음에 끼워넣을 데이터
   * @returns {Array} 데이터가 추가된 배열
   */
  add: (array, cur, data = null) => {
    if (array.length > 0) {
      return [...array.slice(0, cur + 1), data, ...array.slice(cur + 1)];
    }
    return [data];
  },

  /**
   * @param {Array} array 데이터를 끼워넣을 배열
   * @param {Number} cur 현재 인덱스
   * @param {any} data 현재 인덱스에 끼워넣을 데이터
   * @returns {Array} 데이터가 추가된 배열
   */
  addBefore: (array, cur, data = null) => {
    if (array.length > 0) {
      return [...array.slice(0, cur), data, ...array.slice(cur)];
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
      return [...array.slice(0, cur), data, ...array.slice(cur + 1)];
    }
    return [data];
  },

  /**
   * @param {Array} array 데이터를 삭제할 배열
   * @param {Number} cur 현재 인덱스
   */
  delete: (array, cur) => {
    if (array.length > 0) {
      return [...array.slice(0, cur), ...array.slice(cur + 1)];
    }
    return [];
  },

  /**
   * @param {Array} array 데이터를 변경할 배열
   * @param {Number} cur 현재 인덱스
   * @param {Array} data 삽입할 배열
   * @returns {Array} 데이터가 변경된 배열
   */
  pushArray: (array, cur, data) => {
    return [...array.slice(0, cur + 1), ...data, ...array.slice(cur + 1)];
  },

  /**
   * @param {Array} array 데이터를 삭제할 배열
   * @param {Number} start 삭제할 시작 인덱스
   * @param {Number} end 삭제할 끝 인덱스
   */
  popArray: (array, start, end) => {
    return [...array.slice(0, start), ...array.slice(end + 1)];
  },
};

utils.deepCopy = (obj) => {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  const keys = Object.keys(obj) || [];
  keys.forEach((key) => {
    result[key] = utils.deepCopy(obj[key]);
  });
  return result;
};

utils.getTypeString = (obj) => {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
};

utils.copyText = (text) => {
  const tmpElement = document.createElement("textarea");
  tmpElement.value = text;
  document.body.appendChild(tmpElement);

  tmpElement.select();
  document.execCommand("copy");
  document.body.removeChild(tmpElement);
};

export default utils;

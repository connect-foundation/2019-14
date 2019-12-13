import utils from "./Common";

const { splice } = utils;

// eslint-disable-next-line import/no-mutable-exports
let uuidArray = [];

const getUuidArray = function() {
  return uuidArray;
};

/**
 * uuidArray를 빈 배열로 초기화시킨다.
 */
const init = function() {
  uuidArray = [];
};

/**
 * uuid를 맨 뒤에 추가한다.
 * @param {Uuid} uuid uuid 모듈을 사용하여 생성한 uuid
 * @param {Number?} index 새로운 uuid를 추가할 기준 셀의 index
 * - 생략시 맨 뒤에 삽입한다.
 */
const push = function(uuid, index) {
  if (index !== undefined) {
    uuidArray = splice.add(uuidArray, index, uuid);
  } else {
    uuidArray.push(uuid);
  }
};

/**
 * 지정한 index의 uuid를 삭제한다.
 * @param {Number} index 삭제할 셀의 index
 */
const pop = function(index) {
  uuidArray = splice.delete(uuidArray, index);
};

/**
 * @param {Number} start 삭제할 데이터의 시작 인덱스
 * @param {Number} end 삭제할 데이터의 끝 인덱스
 */
const blockDelete = function(start, end) {
  uuidArray = splice.popArray(uuidArray, start, end);
};

/**
 * uuid를 이용하여 인덱스를 검색한다.
 * @param {Uuid} uuid 인덱스를 검색할 uuid
 * @returns {Number} uuid를 이용하여 검색한 인덱스를 리턴한다. 존재하지 않을시 -1.
 */
const findIndex = function(uuid) {
  const index = uuidArray.findIndex((cellUuid) => cellUuid === uuid);
  return index;
};

export default {
  getUuidArray,
  init,
  push,
  pop,
  blockDelete,
  findIndex,
};

import utils from "./Common";

const { splice } = utils;

/**
 * @constructs uuidArray uuid를 모두 가지고 있는 배열.
 * @constructs push(uuid) uuid를 맨 뒤에 추가한다.
 * @constructs findIndex(uuid) uuid를 이용하여 인덱스를 검색한다.
 */
function UuidManager() {
  this.uuidArray = [];
}

/**
 * uuid를 맨 뒤에 추가한다.
 * @param {Uuid} uuid uuid 모듈을 사용하여 생성한 uuid
 * @param {Number?} index 새로운 uuid를 추가할 기준 셀의 index
 * - 생략시 맨 뒤에 삽입한다.
 */
UuidManager.prototype.push = function(uuid, index) {
  if (index) {
    this.uuidArray = splice.add(this.uuidArray, index, uuid);
  } else {
    this.uuidArray.push(uuid);
  }
};

/**
 * 지정한 index의 uuid를 삭제한다.
 * @param {Number} index 삭제할 셀의 index
 */
UuidManager.prototype.pop = function(index) {
  this.uuidArray = splice.delete(this.uuidArray, index);
};

/**
 * @param {Number} start 삭제할 데이터의 시작 인덱스
 * @param {Number} end 삭제할 데이터의 끝 인덱스
 */
UuidManager.prototype.blockDelete = function(start, end) {
  this.uuidArray = splice.popArray(this.uuidArray, start, end);
};

/**
 * uuid를 이용하여 인덱스를 검색한다.
 * @param {Uuid} uuid 인덱스를 검색할 uuid
 * @returns {Number} uuid를 이용하여 검색한 인덱스를 리턴한다. 존재하지 않을시 -1.
 */
UuidManager.prototype.findIndex = function(uuid) {
  const index = this.uuidArray.findIndex((cellUuid) => cellUuid === uuid);
  return index;
};

export default UuidManager;

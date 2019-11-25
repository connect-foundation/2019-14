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
 */
UuidManager.prototype.push = (uuid) => {
  this.uuidArray.push(uuid);
};

/**
 * uuid를 이용하여 인덱스를 검색한다.
 * @param {Uuid} uuid 인덱스를 검색할 uuid
 * @returns {Number} uuid를 이용하여 검색한 인덱스를 리턴한다. 존재하지 않을시 -1.
 */
UuidManager.prototype.findIndex = (uuid) => {
  const index = this.uuidArray.findIndex((cellUuid) => cellUuid === uuid);
  return index;
};

export default UuidManager;

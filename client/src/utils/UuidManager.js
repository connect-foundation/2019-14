function UuidManager() {
  this.uuidArray = [];

  /**
   * uuid를 맨 뒤에 추가한다.
   * @param {Uuid} uuid uuid 모듈을 사용하여 생성한 uuid
   */
  this.push = (uuid) => {
    this.uuidArray.push(uuid);
  };

  /**
   * @param {Uuid} uuid uuid를 이용하여 인덱스를 검색한다.
   * @returns {Number} uuid를 이용하여 검색한 인덱스를 리턴한다. 존재하지 않을시 -1.
   */
  this.findIndex = (uuid) => {
    const index = this.uuidArray.findIndex((cellUuid) => cellUuid === uuid);
    return index;
  };
}

export default UuidManager;

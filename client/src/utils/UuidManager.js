function UuidManager() {
  this.uuidArray = [];

  this.push = (uuid) => {
    this.uuidArray.push(uuid);
  };

  this.findIndex = (uuid) => {
    const index = this.uuidArray.findIndex((cellUuid) => cellUuid === uuid);
    return index;
  };
}

export default UuidManager;

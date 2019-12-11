import clientIo from "socket.io-client";

class SocketManager {
  constructor() {
    this.connections = {};
  }

  enroll(uuid) {
    if (!this.connections[uuid]) {
      this.connections[uuid] = clientIo(`http://localhost:9090`);
    }
    return this.connections[uuid];
  }

  get(uuid) {
    return this.connections[uuid];
  }
}

export default new SocketManager();

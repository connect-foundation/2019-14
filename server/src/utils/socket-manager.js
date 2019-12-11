const debug = require("debug")("boostwriter:socket-manager");

class SocketManager {
  constructor() {
    this.server = null;
    this.connections = {};
  }

  init(server) {
    this.server = server;
  }

  enrollSocket(id, socket) {
    if (this.connections[id] !== undefined) {
      this.disconnectSocket(id);
    }
    this.connections[id] = {};
    this.connections[id].socket = socket;
  }

  attachEvent(id, event, cb) {
    const { socket } = this.connections[id];
    socket.on(event, cb);
  }

  disconnectSocket(id) {
    const targetSocket = this.connections[id].socket;
    if (targetSocket) {
      targetSocket.disconnect(true);
    }
    this.connections[id].socket = null;
  }
}

module.exports = new SocketManager();

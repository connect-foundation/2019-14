const debug = require("debug")("boostwriter:socket-manager");

class SocketManager {
  constructor() {
    this.server = null;
    this.connections = {};
  }

  init(server) {
    this.server = server;
  }

  async makeClientConnection(session) {
    const { id } = session;
    if (this.connections[id] !== undefined) {
      this.disconnectSocket(id);
    }
    this.connections[id] = {
      io: this.server.of(`/io/${id}`),
      socket: null,
    };

    const current = this.connections[id];
    const currentIo = current.io;

    return new Promise((resolve) => {
      currentIo.on("connection", (socket) => {
        debug(`Connection success with ${id}`);
        current.socket = socket;
        resolve(socket);
      });
    });
  }

  attachEvent(id, event, cb) {
    const { socket } = this.connections[id];
    socket.on(event, cb);
  }

  disconnectSocket(id) {
    const targetSocket = this.connections[id].socket;
    targetSocket.disconnect(true);
    this.connections[id].socket = null;
  }
}

module.exports = new SocketManager();

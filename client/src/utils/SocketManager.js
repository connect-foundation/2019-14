import clientIo from "socket.io-client";
import createDebug from "debug";

const debug = createDebug("boost:socket-manager");

class SocketManager {
  constructor() {
    this.connections = {};
  }

  enroll(uuid) {
    if (!this.connections[uuid]) {
      this.connections[uuid] = clientIo(`${process.env.SERVER_URL}/${uuid}`);
      debug("make socket io connection & enroll", uuid, this);
    }
    const connection = this.connections[uuid];
    connection.on("disconnect", (reason) => {
      debug("socket io disconnect with", reason);
    });
    connection.on("error", (err) => {
      debug("socket io error with", err);
    });
    connection.on("connect_error", (err) => {
      debug("socket io connect error with", err);
    });

    return this.connections[uuid];
  }

  release(uuid) {
    const connection = this.connections[uuid];
    debug("release socket connection", connection);
    if (!connection) {
      return;
    }
    this.connections[uuid] = null;
    connection.close();
  }

  get(uuid) {
    return this.connections[uuid];
  }
}

export default new SocketManager();

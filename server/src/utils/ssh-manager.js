const debug = require("debug")("boostwriter:ssh-manager");
const SshConnection = require("../api/ssh");

class SshConnectionManager {
  constructor() {
    this.connections = {};
  }

  async makeShellConnection(id, session) {
    if (this.connections[id]) {
      return this.connections[id].channel;
    }
    this.connections[id] = new SshConnection();

    debug("shell conecting...", this.connections[id]);
    const current = this.connections[id];
    let shellChannel;
    try {
      shellChannel = await current.connect({ ...session });
    } catch (err) {
      debug("shell conection error", err);
    }
    return shellChannel;
  }

  getConnection(id) {
    return this.connections[id];
  }

  disconnect(id) {
    const connection = this.connections[id];
    if (!connection) {
      return false;
    }
    connection.disconnect();
    this.connections[id] = null;
    return true;
  }

  writeTo(id, cmd) {
    const connection = this.connections[id];
    if (!connection) {
      return false;
    }
    connection.write(cmd);
    return true;
  }

  sendSignal(id, signal) {
    const connection = this.connections[id];
    if (!connection) {
      return false;
    }
    connection.sendSignal(signal);
    return true;
  }
}

module.exports = new SshConnectionManager();

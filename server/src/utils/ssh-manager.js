const SshConnection = require("../api/ssh");

class SshConnectionManager {
  constructor() {
    this.connections = {};
  }

  async makeShellConnection(session) {
    const { id } = session;
    if (this.connections[id]) {
      return this.connections[id].channel;
    }
    this.connections[id] = new SshConnection();
    const current = this.connections[id];
    const shellChannel = await current.connect({ ...session });
    return shellChannel;
  }

  getConnection(id) {
    return this.connections[id];
  }
}

module.exports = new SshConnectionManager();

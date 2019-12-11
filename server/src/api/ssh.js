const debug = require("debug")("boost:api:ssh");
const Ssh = require("ssh2");

const SIGNAL = {
  SIGINT: "\x03",
};

const isSignal = (str) => {
  return Object.keys(SIGNAL).includes(str);
};

class SshConnection {
  constructor() {
    this.connection = new Ssh();
    this.channel = null;
    this.resolvedOptions = {};
  }

  async connect(options) {
    const defaultOptions = {
      tryKeyboard: true,
      keepaliveInterval: 100 * 1000,
      keepaliveCountMax: 100,
    };

    this.resolvedOptions = { ...defaultOptions, ...options };

    this.resolvedOptions.onKeyboardInteractive = (
      name,
      instructions,
      instructionsLang,
      prompts,
      finish
    ) => {
      finish([this.resolvedOptions.password]);
    };

    const makeConnection = () => {
      return new Promise((resolve, reject) => {
        this.connection.on("ready", () => {
          debug(`ssh connection ready!`);

          const channel = this.makeShellChannel();

          resolve(channel);
        });

        this.connection.on("error", (err) => {
          debug(`ssh connection error : ${err}`);

          reject(err);
        });

        debug(`ssh connection start`, this.connection, this.resolvedOptions);
        this.connection.connect(this.resolvedOptions);
      });
    };

    this.channel = await makeConnection();
    return this.channel;
  }

  async makeShellChannel() {
    const makeShell = () => {
      return new Promise((resolve, reject) => {
        this.connection.shell((err, channel) => {
          if (err) {
            debug("Fail to create shell", err);
            reject(err);
          } else {
            resolve(channel);
          }
        });
      });
    };

    const channel = await makeShell();
    return channel;
  }

  write(str) {
    const trimmed = str.trim();
    if (isSignal(trimmed)) {
      const signalStr = SIGNAL[trimmed];

      debug(`Send signal ${trimmed} : ${signalStr}`);

      this.channel.write(signalStr);
    } else {
      const line = trimmed.endsWith("\n") ? trimmed : `${trimmed}\n`;

      debug(`Send shell command ${line}`);

      this.channel.write(line);
    }
  }
}

module.exports = SshConnection;

import createDebug from "debug";
import axios from "axios";

const debug = createDebug("boost:request");

const SCHEME = "http";

const BASE_URL = "localhost:9090";

const TERMINAL_API = "api/terminal";

const PATH = {
  COMMAND: `${TERMINAL_API}/command/not-pending`,
  COMMAND_PENDING: `${TERMINAL_API}/command/pending`,
  COMMAND_SSH: `${TERMINAL_API}/command/ssh`,
  SAVE: "api/document",
  LOAD: "api/document",
  TERMINAL: "api/terminal",
};

const defaultOptions = {
  method: "GET",
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const request = {
  async exec(to, command) {
    const options = {
      ...defaultOptions,
      method: "POST",
      url: `${SCHEME}://${BASE_URL}/${PATH.COMMAND}`,
      data: {
        containerId: to,
        cmd: command,
      },
    };
    const response = await axios(options);
    debug("not-pending response", response);
    return response;
  },

  async execPending(to, command, stdin) {
    const options = {
      ...defaultOptions,
      method: "POST",
      url: `${SCHEME}://${BASE_URL}/${PATH.COMMAND_PENDING}`,
      data: {
        containerId: to,
        cmd: command,
        stdin,
      },
    };
    const response = await axios(options);
    debug("pending response", response);
    return response;
  },

  async execSsh(command, stdin) {
    const options = {
      ...defaultOptions,
      method: "POST",
      url: `${SCHEME}://${BASE_URL}/${PATH.COMMAND_SSH}`,
      data: {
        cmd: command,
        stdin,
      },
    };
    const response = await axios(options);
    debug("pending response", response);
    return response;
  },
  async do(command, method = "GET", data = null) {
    const uri = `${SCHEME}://${BASE_URL}/${PATH[command]}`;
    let option = {
      method,
      mode: "cors",
      gzip: true,
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
    };
    const body = JSON.stringify(data);
    if (method !== "GET") {
      option = Object.assign(option, { body });
    }
    const result = await fetch(uri, {
      ...option,
    });
    return result;
  },
};

const createTerminalFetch = async (option) => {
  const options = {
    ...defaultOptions,
    method: "POST",
    url: `${SCHEME}://${BASE_URL}/${PATH.TERMINAL}`,
    data: {
      terminalOption: option,
    },
  };
  const response = await axios(options);
  return response;
};

export { request, createTerminalFetch };

import createDebug from "debug";
import axios from "axios";

const debug = createDebug("boost:request");

const BASE_URL = process.env.SERVER_URL;

const TERMINAL_API = "api/terminal";

const PATH = {
  COMMAND: `${TERMINAL_API}/command/not-pending`,
  COMMAND_PENDING: `${TERMINAL_API}/command/pending`,
  COMMAND_SSH: `${TERMINAL_API}/command/ssh`,
  SAVE: "api/document",
  LOAD: "api/document",
  TERMINAL: "api/terminal",
  SHARE: "api/share",
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
      url: `${BASE_URL}/${PATH.COMMAND}`,
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
      url: `${BASE_URL}/${PATH.COMMAND_PENDING}`,
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
      url: `${BASE_URL}/${PATH.COMMAND_SSH}`,
      data: {
        cmd: command,
        stdin,
      },
    };
    const response = await axios(options);
    debug("pending response", response);
    return response;
  },
  async saveDocument({ containerId, documentString }) {
    const options = {
      ...defaultOptions,
      method: "PATCH",
      url: `${BASE_URL}/${PATH.SAVE}`,
      validateStatus: () => {
        return true;
      },
      data: {
        containerId,
        docContent: documentString,
      },
    };
    const response = await axios(options);
    return response;
  },

  async loadDocument(containerId) {
    const options = {
      ...defaultOptions,
      url: `${BASE_URL}/${PATH.LOAD}/${containerId}`,
      validateStatus: () => {
        return true;
      },
    };
    const response = await axios(options);
    return response;
  },

  async shareDocument(containerId) {
    const options = {
      ...defaultOptions,
      method: "POST",
      url: `${BASE_URL}/${PATH.SHARE}`,
      validateStatus: () => {
        return true;
      },
      data: {
        containerId,
      },
    };
    const response = await axios(options);
    return response;
  },

  async loadSharingDocument(shareId) {
    const options = {
      ...defaultOptions,
      url: `${BASE_URL}/${PATH.SHARE}/${shareId}`,
      validateStatus: () => {
        return true;
      },
    };
    const response = await axios(options);
    return response;
  },
};

const createTerminalFetch = async (option) => {
  const options = {
    ...defaultOptions,
    method: "POST",
    url: `${BASE_URL}/${PATH.TERMINAL}`,
    data: {
      terminalOption: option,
    },
  };
  const response = await axios(options);
  return response;
};

export { request, createTerminalFetch };

import axios from "axios";

const SCHEME = "http";

const BASE_URL = "localhost:9090";

const PATH = {
  COMMAND: "api/terminal/command/not-pending",
  SAVE: "api/document",
  LOAD: "api/document",
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
        containerName: to,
        cmd: command,
      },
    };
    const response = await axios(options);
    console.log(response);
    return response;
  },
  async do(command, method = "GET", data = null) {
    const uri = `${SCHEME}://${BASE_URL}/${PATH[command]}`;
    let option = {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    if (method !== "GET") {
      option = Object.assign(body, { body });
    }
    const result = await fetch(uri, {
      ...option,
    });
    return result;
  },
};

export default request;

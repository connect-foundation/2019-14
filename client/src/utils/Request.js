import axios from "axios";

const SCHEME = "http";

const BASE_URL = "localhost:9090";

const PATH = {
  COMMAND: "api/terminal/command/not-pending",
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
};

export default request;

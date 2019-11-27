import utils from "./Common";

const { getTypeString } = utils;

const fetchNonBody = async function fetchNonBodyMethod(method, path, options) {
  const mergedOptions = {
    ...this.options,
    ...options,
    method,
  };
  const response = await fetch(
    `${this.scheme}://${this.baseUrl}/${path}`,
    mergedOptions
  );
  return response;
};

const fetchBody = async function fetchBodyMethod(method, path, body, options) {
  const mergedOptions = {
    ...this.options,
    ...options,
    method,
  };
  if (getTypeString(body) === "object") {
    mergedOptions.body = JSON.stringify(body);
  } else {
    mergedOptions.body = body;
  }
  const response = await fetch(
    `${this.scheme}://${this.baseUrl}/${path}`,
    mergedOptions
  );
  return response;
};

/**
 * baseUrl: 'test.hello.com'
 *
 * defaultOptions.cors = true | false
 *
 * defaultOptions.credentials = true | false
 *
 * defaultOptions.https = true | false
 *
 */
class Request {
  constructor(baseUrl = "localhost", defaultOptions = {}) {
    this.baseUrl = baseUrl;
    if (this.baseUrl.endsWith("/")) {
      this.baseUrl = this.baseUrl.slice(0, -1);
    }
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...defaultOptions.headers,
    };
    this.options = {
      headers: this.headers,
    };

    if (defaultOptions.https) {
      this.scheme = "https";
    } else {
      this.scheme = "http";
    }

    if (defaultOptions.cors) {
      this.options.mode = "cors";
    } else {
      this.options.mode = "same-origin";
    }

    if (defaultOptions.credentials) {
      this.options.credentials = "include";
    } else {
      this.options.credentials = "same-origin";
    }

    this.fetchNonBody = fetchNonBody.bind(this);
    this.fetchBody = fetchBody.bind(this);
  }

  async get(path, options = {}) {
    const response = await this.fetchNonBody("GET", path, options);
    return response;
  }

  async post(path, body, options = {}) {
    const response = await this.fetchBody("POST", path, body, options);
    return response;
  }

  async patch(path, body, options = {}) {
    const response = await this.fetchBody("PATCH", path, body, options);
    return response;
  }
}

export default Request;

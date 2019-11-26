#!/usr/bin/env node

/**
 * Module dependencies.
 */

require("../src/env-loader").appendEnv("remote");

const debug = require("debug")("boostwriter:index");
const http = require("http");
const app = require("../src/app");

/**
 * Get port from environment and store in Express.
 */

const port = process.env.EXPRESS_PORT || 3000;
app.set("port", port);

/**
 * Docker를 사용하기 위한 설정
 */

const { DockerApi } = require("../src/api/docker");

const dockerOptions = {
  host: process.env.REMOTE_DOCKER_IP,
  port: process.env.REMOTE_DOCKER_PORT,
  caPath: process.env.SSL_CA_PATH,
  certPath: process.env.SSL_CERT_PATH,
  keyPath: process.env.SSL_KEY_PATH,
};

const docker = new DockerApi(dockerOptions);
docker.init();

app.set("docker", docker);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

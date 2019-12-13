const express = require("express");
const SocketServer = require("socket.io");

const { DockerApi } = require("../src/api/docker");
const { socketManager, sshManager } = require("../src/utils");

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);
socketManager.init(io);

/**
 * Docker를 사용하기 위한 설정
 */
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
 * 임시로 고정된 ssh 유저 세션을 위한 설정
 */
const sshOptions = {
  id: "testid",
  username: process.env.REMOTE_SSH_USERNAME,
  password: process.env.REMOTE_SSH_PASSWORD,
  port: process.env.REMOTE_CONTAINER_PORT,
  host: process.env.REMOTE_DOCKER_IP,
};
app.set("session", sshOptions);

const sessionMiddleware = (req, res, next) => {
  // TODO: 후에 express session을 통해서 session객체를 얻어 올 수 있다.
  req.session = sshOptions;
  next();
};

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

io.of((name, query, next) => {
  next(null, true);
}).on("connection", async (socket) => {
  const { session } = socket.request;
  const connectionId = session.id + socket.nsp.name;

  debug("start connecting session", session);

  const shellChannel = await sshManager.makeShellConnection(
    connectionId,
    session
  );

  socketManager.enrollSocket(connectionId, socket);

  debug("Connect socket and shell channel");

  // server <-- docker container
  shellChannel.on("data", (data) => {
    debug(`Shell command output : ${data}`);
    // client <-- server
    socket.emit("stdout", data);
  });

  // client --> (server) --> docker container
  socket.on("stdin", (cmd) => {
    debug(`Shell command stdin : ${cmd}`);
    sshManager.writeTo(connectionId, cmd);
  });

  socket.on("signal", (signal) => {
    debug(`Shell signal : ${signal}`);
    sshManager.sendSignal(connectionId, signal);
  });

  socket.on("disconnect", (reason) => {
    debug(`socket io disconnect by ${reason}`);
    sshManager.disconnect(connectionId);
  });

  shellChannel.on("end", () => {
    debug("Shell channel connection end");
  });

  shellChannel.on("close", () => {
    debug("Shell channel connection close");
  });

  shellChannel.on("error", (error) => {
    debug("Shell channel connection error", error);
  });
});

const debug = require("debug")("boostwriter:app");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const http = require("http");
const SocketServer = require("socket.io");

const { DockerApi } = require("../src/api/docker");
const { socketManager, sshManager } = require("../src/utils");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const terminalRouter = require("./routes/terminal");
const documentRouter = require("./routes/document");

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptionsDelegate = (req, callback) => {
  const corsOptions = {
    // pass all origin
    origin: true,
    // Access-Control-Allow-Credentials: true
    credentials: true,
  };
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(cookieParser());

const sessionMiddleware = (req, res, next) => {
  // TODO: 후에 express session을 통해서 session객체를 얻어 올 수 있다.
  req.session = sshOptions;
  next();
};

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/terminal", terminalRouter);
app.use("/api/document", documentRouter);

io.of((name, query, next) => {
  next(null, true);
}).on("connection", async (socket) => {
  const { session } = socket.request;
  const connectionId = session.id + socket.nsp.name;

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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return next(createError(404));
});

// error handler
app.use((err, req, res) => {
  debug("Last Error Middleware", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).end();
});

module.exports = { app, server };

const debug = require("debug")("boostwriter:app");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

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

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const terminalRouter = require("./routes/terminal");
const documentRouter = require("./routes/document");

const app = express();

app.set("docker", docker);

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

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/terminal", terminalRouter);
app.use("/api/document", documentRouter);

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

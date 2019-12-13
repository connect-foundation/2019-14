const { StreamResolver } = require("./stream-resolver");
const socketManager = require("./socket-manager");
const sshManager = require("./ssh-manager");

const utils = {};

utils.wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

utils.isString = (v) => {
  return v instanceof String || typeof v === "string";
};

utils.isFunction = (v) => {
  return typeof v === "function";
};

module.exports = { utils, StreamResolver, socketManager, sshManager };

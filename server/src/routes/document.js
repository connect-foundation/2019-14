const express = require("express");

const { utils } = require("../utils");
const { documentController } = require("../controller");

const { wrapAsync } = utils;

const router = express.Router();

router
  .route("/")
  .get(wrapAsync(documentController.load))
  .patch(wrapAsync(documentController.save));

module.exports = router;

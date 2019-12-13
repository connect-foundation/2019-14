const express = require("express");

const router = express.Router();
const { utils } = require("../utils");
const { documentController } = require("../controller");

const { wrapAsync } = utils;

router
  .route("/")
  .get(wrapAsync(documentController.load))
  .patch(wrapAsync(documentController.save));
module.exports = router;

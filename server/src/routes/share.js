const express = require("express");

const router = express.Router();
const { utils } = require("../utils");
const { shareController } = require("../controller");

const { wrapAsync } = utils;

router.route("/").post(wrapAsync(shareController.share));

router.route("/:shareId").get(wrapAsync(shareController.load));

module.exports = router;

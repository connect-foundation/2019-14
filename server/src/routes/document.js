const express = require("express");

const { utils } = require("../utils");
const { documentController } = require("../controller");

const { wrapAsync } = utils;

const router = express.Router();

router.route("/").patch(wrapAsync(documentController.save));

router.route("/:containerId").get(wrapAsync(documentController.load));

module.exports = router;

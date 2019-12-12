const express = require("express");
const debug = require("debug")("boostwriter:router:index");

const router = express.Router();

/* GET home page. */
router.get("/", (req) => {
  debug("route /", req);
  // res.render("index", { title: "Express" });
});

module.exports = router;

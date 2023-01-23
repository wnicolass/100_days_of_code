const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("index");
});

router.get("/about", (req, res) => {
  return res.render("about");
});

module.exports = router;

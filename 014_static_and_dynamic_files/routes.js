const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.render("index");
});

routes.get("/restaurants", (req, res) => {
  //   res.sendFile("/src/views/restaurants"); <- sendFile function can render html.
});

module.exports = routes;

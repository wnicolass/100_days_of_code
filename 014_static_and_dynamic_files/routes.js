const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.render("index");
});

routes.get("/restaurants", (req, res) => {
  res.render("restaurants");
});

routes.get("/recommend", (req, res) => {
  res.render("recommend");
});

routes.get("/confirm", (req, res) => {
  res.render("confirm");
});

routes.get("/about", (req, res) => {
  res.render("about");
});

module.exports = routes;

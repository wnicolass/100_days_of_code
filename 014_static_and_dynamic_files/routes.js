const { application } = require("express");
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

routes.post("/recommend", (req, res) => {
  const { name, ...restaurantInformation } = req.body;
  const restaurant = {
    [name]: restaurantInformation,
  };

  console.log(restaurant);
});

routes.get("/confirm", (req, res) => {
  res.render("confirm");
});

routes.get("/about", (req, res) => {
  res.render("about");
});

module.exports = routes;

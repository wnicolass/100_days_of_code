const express = require("express");
const uuid = require("uuid");
const Utils = require("./src/utils/Utils");
const routes = express.Router();

routes.get("/", (req, res) => {
  return res.render("index");
});

routes.get("/restaurants", (req, res) => {
  const existingRestaurants = Utils.getFileData();
  return res.render("restaurants", {
    numberOfRestaurants: existingRestaurants.length,
    existingRestaurants,
  });
});

routes.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  const existingRestaurants = Utils.getFileData();
  const restaurantFound = existingRestaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (restaurantFound) {
    return res.render("restaurant-detail", { restaurantFound });
  }
  return res.status(404).render("404");
});

routes.get("/recommend", (req, res) => {
  return res.render("recommend");
});

routes.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const existingRestaurants = Utils.getFileData();

  existingRestaurants.push(restaurant);

  Utils.writeIntoFile(existingRestaurants);
  return res.redirect("confirm");
});

routes.get("/confirm", (req, res) => {
  return res.render("confirm");
});

routes.get("/about", (req, res) => {
  return res.render("about");
});

module.exports = routes;

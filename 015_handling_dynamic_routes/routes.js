const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const filePath = path.join(__dirname, "data", "restaurants.json");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.render("index");
});

routes.get("/restaurants", (req, res) => {
  const fileData = fs.readFileSync(filePath);
  const existingRestaurants = JSON.parse(fileData);
  res.render("restaurants", {
    numberOfRestaurants: existingRestaurants.length,
    existingRestaurants,
  });
});

routes.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  res.render("restaurant-detail", { restaurantId });
});

routes.get("/recommend", (req, res) => {
  res.render("recommend");
});

routes.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4;
  const fileData = fs.readFileSync(filePath);
  const existingRestaurants = JSON.parse(fileData);
  existingRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(existingRestaurants));
  res.redirect("confirm");
});

routes.get("/confirm", (req, res) => {
  res.render("confirm");
});

routes.get("/about", (req, res) => {
  res.render("about");
});

module.exports = routes;

const express = require("express");
const uuid = require("uuid");
const Utils = require("../src/utils/Utils");
const router = express.Router();

router.get("/restaurants", (req, res) => {
  let order = req.query.order;
  const existingRestaurants = Utils.getRestaurants();
  let nextOrder = order === "asc" ? "desc" : "asc";

  if (order) {
    existingRestaurants.sort((a, b) => {
      if (
        (order === "asc" && a.name > b.name) ||
        (order === "desc" && b.name > a.name)
      ) {
        return 1;
      }
      return -1;
    });
  }

  return res.render("restaurants", {
    numberOfRestaurants: existingRestaurants.length,
    existingRestaurants,
    nextOrder,
    order,
  });
});

router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  const existingRestaurants = Utils.getRestaurants();
  const restaurantFound = existingRestaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (restaurantFound) {
    return res.render("restaurant-detail", { restaurantFound });
  }
  return res.status(404).render("404");
});

router.get("/recommend", (req, res) => {
  return res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const existingRestaurants = Utils.getRestaurants();

  existingRestaurants.push(restaurant);

  Utils.saveRestaurants(existingRestaurants);
  return res.redirect("confirm");
});

router.get("/confirm", (req, res) => {
  return res.render("confirm");
});

module.exports = router;

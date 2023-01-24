const express = require("express");
const uuid = require("uuid");
const Utils = require("../src/utils/Utils");
const router = express.Router();

router.get("/restaurants", (req, res) => {
  const existingRestaurants = Utils.getRestaurants();

  existingRestaurants.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });

  return res.render("restaurants", {
    numberOfRestaurants: existingRestaurants.length,
    existingRestaurants,
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

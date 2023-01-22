const fs = require("fs");
const path = require("path");

module.exports = {
  path: path.resolve("data", "restaurants.json"),
  getRestaurants() {
    const fileData = fs.readFileSync(this.path);
    const existingRestaurants = JSON.parse(fileData);
    return existingRestaurants;
  },

  saveRestaurants(storedRestaurants) {
    return fs.writeFileSync(this.path, JSON.stringify(storedRestaurants));
  },
};

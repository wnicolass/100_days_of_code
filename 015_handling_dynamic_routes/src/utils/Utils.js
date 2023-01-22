const fs = require("fs");
const path = require("path");

module.exports = {
  path: path.resolve("data", "restaurants.json"),
  getFileData() {
    const fileData = fs.readFileSync(this.path);
    const existingRestaurants = JSON.parse(fileData);
    return existingRestaurants;
  },

  writeIntoFile(fileToWrite) {
    return fs.writeFileSync(this.path, JSON.stringify(fileToWrite));
  },
};

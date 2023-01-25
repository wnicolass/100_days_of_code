const fs = require("fs");

function readFile() {
  let fileData;
  try {
    fileData = fs.readFileSync("data.json");
  } catch (error) {
    console.log("An error occurred!");
  } finally {
    console.log("Hi there!");
  }
  console.log(fileData);
}

readFile();

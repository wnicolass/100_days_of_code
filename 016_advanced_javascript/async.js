const fs = require("fs");

function readFile() {
  let fileData = fs.readFile("data.txt", (err, data) => {
    if (err) throw err;
    console.log("File parsing done!");
    console.log(data.toString());
  });
  console.log("hi there");
}

readFile();

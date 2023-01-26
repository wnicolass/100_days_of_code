const fs = require("fs/promises");

async function readFile() {
  //calbacks
  //   let fileData = fs.readFile("data.txt", (err, data) => {
  //     if (err) throw err;
  //     console.log("File parsing done!");
  //     console.log(data.toString());
  //   });

  //promises
  //   fs.readFile("data.txt", { encoding: "utf8" })
  //     .then((data) => {
  //       console.log("File parsing done!");
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));

  //async-await
  try {
    const fileData = await fs.readFile("data.txt", { encoding: "utf8" });

    console.log("File parsing done!");
    console.log(fileData);
  } catch (error) {
    console.error(error);
  }
  console.log("hi there");
}

readFile();

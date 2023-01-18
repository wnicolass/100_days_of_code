const express = require("express");
const fs = require("fs");
const path = require("path");
const routes = express.Router();

routes.get("/currenttime", (req, res) =>
  res.send(`<h1>${new Date().toISOString()}</h1>`)
); //localhost:3000/currenttime

routes.get("/", (req, res) => {
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"/><button>Submit</button></form>'
  );
}); //localhost:3000/

routes.post("/store-user", (req, res) => {
  const username = req.body.username;
  const filePath = path.resolve(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(username);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  res.send("<h1>Username stored!</h1>");
});

module.exports = routes;

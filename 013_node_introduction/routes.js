const express = require("express");
const fs = require("fs");
const path = require("path");
const routes = express.Router();
const filePath = path.resolve(__dirname, "data", "users.json");

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
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(username);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  res.send(
    "<h1>User successfully added!</h1><a href='/users'>Click here to see your list of users!</a>"
  );
});

routes.get("/users", (req, res) => {
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let response = "<ul>";
  existingUsers.forEach((user) => {
    response += `<li>${user}</li>`;
  });
  response += "</ul>";

  res.send(
    `<h1>Users List below!</h1>${response}<a href="/">Back to form!</a>`
  );
});

module.exports = routes;

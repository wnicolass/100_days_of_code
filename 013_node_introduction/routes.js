const express = require("express");
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
  console.log(req.body);
  res.send("<h1>Username stored!</h1>");
});

module.exports = routes;

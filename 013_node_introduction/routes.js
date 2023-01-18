const express = require("express");
const routes = express.Router();

routes.get("/currenttime", (req, res) =>
  res.send(`<h1>${new Date().toISOString()}</h1>`)
); //localhost:3000/currenttime

routes.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
}); //localhost:3000/

module.exports = routes;

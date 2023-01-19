const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();

app.use(express.static(path.resolve(__dirname, "frontend")));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.listen(3000, () => console.log("Server running on port 3000"));

const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000, () => console.log("Server running on port 3000"));
});

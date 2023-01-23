const express = require("express");
const path = require("path");
const {
  inexistingRoutes,
  serverError,
} = require("./src/middlewares/GlobalMiddlewares");
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurant");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use(inexistingRoutes);
app.use(serverError);

app.listen(3000, () => console.log("Server running on port 3000"));

const path = require("path");
const express = require("express");
const blogRoutes = require("./routes/blog");
const db = require("./database/config");
const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static("public")); // Serve static files (e.g. CSS files)

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

db.connectToDb()
  .then(() => {
    app.emit("connected to db");
  })
  .catch((error) => console.error(error.message));

app.on("connected to db", () => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});

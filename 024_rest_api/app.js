const express = require("express");
const app = express();
const db = require("./data/database");

const quoteRoutes = require("./routes/quotesRoutes");
app.use("/quote", quoteRoutes);
app.use((error, req, res, next) => {
  res.status(500).json({
    error: "Something went wrong!",
  });
});

db.initDb()
  .then(() => {
    app.emit("connected to db");
  })
  .catch((err) => console.error(err.message));

const port = 3000;
app.on("connected to db", () => {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});

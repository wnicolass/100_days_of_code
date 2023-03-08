const express = require("express");

const db = require("./data/database");
const todosRouter = require("./routes/todos.routes");
const app = express();

app.use(express.json());
app.use("/todos", todosRouter);
app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong!",
  });
  console.log(error);
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });

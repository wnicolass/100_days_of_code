const express = require("express");
const app = express();
const path = require("path");
const db = require("./database/database");
const routes = require("./routes/demo");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const MongoDBStore = mongodbStore(session);
const sessionStore = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "mvc",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));

const expiryDate = 1000 * 60 * 60 * 24 * 7;
app.use(
  session({
    secret: "hiper-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: expiryDate,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  res.locals.isAuth = isAuth;

  next();
});

app.use(routes);
app.use(function (error, req, res, next) {
  console.log(error.message);
  res.render("500");
});

db.connectToDb().then(() =>
  app.listen(3000, () => console.log("Server running on port 3000"))
);

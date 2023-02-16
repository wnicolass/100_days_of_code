const express = require("express");
const app = express();
const path = require("path");
const db = require("./database/database");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const { createSessionStore, sessionConfig } = require("./configs/session");
const mongoDbSessionStore = createSessionStore(session);
const authMiddleware = require("./middlewares/auth-middleware");
const serverErrorHandler = require("./middlewares/server-error-middleware");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig(mongoDbSessionStore)));

app.use(authMiddleware);

app.use(postRoutes);
app.use(authRoutes);
app.use(serverErrorHandler);

db.connectToDb().then(() =>
  app.listen(3000, () => console.log("Server running on port 3000"))
);

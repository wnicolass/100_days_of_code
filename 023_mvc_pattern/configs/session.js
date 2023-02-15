const mongodbStore = require("connect-mongodb-session");

function createSessionStore(session) {
  const MongoDBStore = mongodbStore(session);

  const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "mvc",
    collection: "sessions",
  });

  return sessionStore;
}

function sessionConfig(sessionStore) {
  const expiryDate = 1000 * 60 * 60 * 24 * 7;

  return {
    secret: "hiper-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: expiryDate,
      httpOnly: true,
    },
  };
}

module.exports = {
  createSessionStore,
  sessionConfig,
};

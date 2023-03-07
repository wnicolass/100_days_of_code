const MongoClient = require("mongodb").MongoClient;
let database;
async function initDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("first-api");
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected!");
  }

  return database;
}

module.exports = {
  initDb,
  getDb,
};

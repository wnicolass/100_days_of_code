const { MongoError, MongoClient } = require("mongodb");
let database;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("file-demo");
}

function getDb() {
  if (!database) {
    throw new MongoError("Database not connected!");
  }

  return database;
}

module.exports = {
  connectToDatabase,
  getDb,
};

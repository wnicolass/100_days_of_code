const { MongoError, MongoClient } = require("mongodb");
let database;

async function connectToDb() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("mvc");
}

function getDb() {
  if (!database) {
    throw new MongoError("Connection failed");
  }
  return database;
}

module.exports = {
  connectToDb,
  getDb,
};

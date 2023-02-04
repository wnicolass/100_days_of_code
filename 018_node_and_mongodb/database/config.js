const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let database;
async function connectToDb() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("blogj");
}

function getDb() {
  if (!database) {
    throw new mongodb.MongoError("Database connection not established!");
  }

  return database;
}

module.exports = {
  connectToDb,
  getDb,
};

const { ObjectId } = require("mongodb");
const db = require("../database/database");

class User {
  constructor(email, password, id) {
    this.email = email;
    this.password = password;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async alreadyExists(email) {
    const user = await db.getDb().collection("users").findOne({ email: email });

    return user;
  }

  async save() {
    const newUser = { email: this.email, password: this.password };

    const insertedUser = await db
      .getDb()
      .collection("users")
      .insertOne(newUser);
    return insertedUser;
  }
}

module.exports = User;

const db = require("../database/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async alreadyExists(email) {
    const user = await db.getDb().collection("users").findOne({ email: email });

    return user;
  }

  async save() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    const newUser = { email: this.email, password: hashedPassword };

    const insertedUser = await db
      .getDb()
      .collection("users")
      .insertOne(newUser);
    return insertedUser;
  }

  async login(comparePassword) {
    const arePasswordsEqual = await bcrypt.compare(
      this.password,
      comparePassword
    );

    return arePasswordsEqual;
  }
}

module.exports = User;

const { ObjectId } = require("mongodb");

const db = require("../data/database");

class Todo {
  constructor(text, id) {
    this.text = text;

    if (id) {
      this.id = ObjectId(id);
    }
  }

  create() {
    return db.getDb().collection("todos").insertOne({ text: this.text });
  }

  static async getTodos() {
    const todosDocs = await db.getDb().collection("todos").find().toArray();

    return todosDocs.map((todoDoc) => new Todo(todoDoc.text, todoDoc._id));
  }

  update() {
    if (!this.id) {
      throw new Error("Trying to delete todo without id!");
    }
    return db
      .getDb()
      .collection("todos")
      .updateOne(
        { _id: this.id },
        {
          $set: { text: this.text },
        }
      );
  }

  delete() {
    if (!this.id) {
      throw new Error("Trying to delete todo without id!");
    }

    return db.getDb().collection("todos").deleteOne({ _id: this.id });
  }
}

module.exports = Todo;

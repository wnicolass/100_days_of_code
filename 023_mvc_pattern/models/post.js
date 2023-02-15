const db = require("../database/database");
const { ObjectId } = require("mongodb");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    if (id) {
      this.id = new ObjectId(id); //may be undefined
    }
  }

  static async fetchAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  async fetchOne() {
    if (!this.id) {
      return;
    }

    const postDocument = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: this.id });
    this.title = postDocument.title;
    this.content = postDocument.content;
  }

  async save() {
    const newPost = { title: this.title, content: this.content };

    const result = await db.getDb().collection("posts").insertOne(newPost);
    return result;
  }

  async update() {
    const updatedPost = await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: this.id },
        { $set: { title: this.title, content: this.content } }
      );

    return updatedPost;
  }

  async delete() {
    if (!this.id) {
      return;
    }
    const deletedPost = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });
    return deletedPost;
  }
}

module.exports = Post;

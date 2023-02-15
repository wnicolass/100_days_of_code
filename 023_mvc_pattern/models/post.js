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
}

module.exports = Post;

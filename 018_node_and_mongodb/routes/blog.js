const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const db = require("../database/config");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDb()
    .collection("posts")
    .find({})
    .project({ title: 1, summary: 1, "author.name": 1 })
    .toArray();
  res.render("posts-list", { posts });
});

router.get("/posts/:id", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: postId }, { projection: { summary: 0 } });

  if (!post) {
    return res.status(404).render("404");
  }

  post.humanReadableDate = post.createdAt.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  res.render("post-detail", { post });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors });
});

router.post("/posts", async (req, res) => {
  const { title, summary, content } = req.body;
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });
  const newPost = {
    title,
    summary,
    content,
    createdAt: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  if (result) {
    return res.redirect("posts");
  }
});

module.exports = router;

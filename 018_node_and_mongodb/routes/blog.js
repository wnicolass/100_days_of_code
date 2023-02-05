const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const db = require("../database/config");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  try {
    const posts = await db
      .getDb()
      .collection("posts")
      .find({})
      .project({ title: 1, summary: 1, "author.name": 1 })
      .toArray();
    return res.render("posts-list", { posts });
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }
});

router.get("/posts/:id", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  let post;

  try {
    post = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: postId }, { projection: { summary: 0 } });
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }

  post.humanReadableDate = post.createdAt.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return res.render("post-detail", { post });
});

router.get("/new-post", async function (req, res) {
  try {
    const authors = await db.getDb().collection("authors").find().toArray();
    return res.render("create-post", { authors });
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }
});

router.post("/posts", async (req, res) => {
  const { title, summary, content } = req.body;
  let author;
  let newPost;
  let authorId;

  try {
    authorId = new ObjectId(req.body.author);
    author = await db.getDb().collection("authors").findOne({ _id: authorId });
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }

  newPost = {
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

  try {
    const result = await db.getDb().collection("posts").insertOne(newPost);
    if (result) {
      return res.redirect("posts");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }
});

router.get("/posts/:id/edit", async (req, res) => {
  let post;
  try {
    const postId = new ObjectId(req.params.id);
    post = await db
      .getDb()
      .collection("posts")
      .findOne(
        { _id: postId },
        { projection: { title: 1, summary: 1, content: 1 } }
      );
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }

  return res.render("update-post", { post });
});

router.post("/posts/:id/edit", async (req, res) => {
  const { title, summary, content } = req.body;
  try {
    const postId = new ObjectId(req.params.id);
    await db.getDb().collection("posts").updateOne(
      { _id: postId },
      {
        $set: {
          title,
          summary,
          content,
          // createdAt: new Date()
        },
      }
    );

    return res.redirect("/posts");
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }
});

router.post("/posts/:id/delete", async (req, res) => {
  try {
    const postIdToDelete = new ObjectId(req.params.id);
    await db.getDb().collection("posts").deleteOne({ _id: postIdToDelete });
  } catch (err) {
    console.error(err.message);
    return res.status(404).render("404");
  }

  return res.redirect("/posts");
});

module.exports = router;

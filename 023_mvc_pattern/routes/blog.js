const router = require("express").Router();
const db = require("../database/database");
const { ObjectId } = require("mongodb");
const Post = require("../models/post");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/admin", async (req, res) => {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  const posts = await db.getDb().collection("posts").find().toArray();

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: "",
      content: "",
    };
  }

  req.session.inputData = null;

  res.render("admin", { posts: posts, inputData: sessionInputData });
});

router.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content || title.trim() === "" || content.trim() === "") {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    return res.redirect("back");
  }

  const post = new Post(title, content);
  await post.save();

  return res.redirect("back");
});

router.get("/posts/:id/edit", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const post = await db.getDb().collection("posts").findOne({ _id: postId });

  if (!post) {
    return res.status(404).render("404");
  }

  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: post.title,
      content: post.content,
    };
  }

  req.session.inputData = null;

  res.render("single-post", { post: post, inputData: sessionInputData });
});

router.post("/posts/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content || title.trim() === "" || content.trim() === "") {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title,
      content,
    };

    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  }

  const post = new Post(title, content, id);
  await post.update();
  res.redirect("/admin");
});

router.post("/posts/:id/delete", async (req, res) => {
  const { id } = req.params;
  const post = new Post(null, null, id);
  await post.delete();
  return res.redirect("/admin");
});

module.exports = router;

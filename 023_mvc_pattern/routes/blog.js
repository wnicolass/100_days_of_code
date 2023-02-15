const router = require("express").Router();
const db = require("../database/database");
const { ObjectId } = require("mongodb");

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

  const newPost = { title, content };

  await db.getDb().collection("posts").insertOne(newPost);
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
  const { id: postId } = req.params;
  const { title, content } = req.body;

  if (!title || !content || title.trim() === "" || content.trim() === "") {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  }

  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(postId) },
      { $set: { title: title, content: content } }
    );
  res.redirect("/admin");
});

router.post("/posts/:id/delete", async (req, res) => {
  const { id: postId } = req.params;
  await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(postId) });

  return res.redirect("/admin");
});

module.exports = router;

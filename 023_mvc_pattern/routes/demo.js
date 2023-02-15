const router = require("express").Router();
const db = require("../database/database");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/signup", (req, res) => {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("signup", {
    inputData: sessionInputData,
  });
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const confirmEmail = req.body["confirm-email"];

  if (!email || !password || password.length < 6 || email !== confirmEmail) {
    req.session.inputData = {
      hasError: true,
      message: "invalid input data, please check your data",
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User already exists!",
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("login");
});

router.get("/login", (req, res) => {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("login", { inputData: sessionInputData });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User does not exists! Check your credentials",
      email,
      password,
    };

    req.session.save((req, res) => {
      res.redirect("back");
    });
    return;
  }

  const arePasswordsEqual = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!arePasswordsEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - Check your credentials",
      email,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(() => {
    res.redirect("/admin");
  });
  return;
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

router.post("/logout", (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
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

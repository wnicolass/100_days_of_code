const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
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
  res.render("signup", { sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("login", { sessionInputData });
});

router.post("/signup", async function (req, res) {
  const { email, password, ...rest } = req.body;
  const confirmEmail = rest["confirm-email"];

  if (
    !email ||
    !confirmEmail ||
    !password ||
    password.trim().length < 6 ||
    email !== confirmEmail
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => res.redirect("/signup"));
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });
  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User already exists - Choose another email.",
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => res.redirect("/signup"));
    return;
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);
  return res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - Check your credentials!",
      email,
      password,
    };
    req.session.save(() => res.redirect("/login"));
    return;
  }

  const isPasswordsEqual = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordsEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - Check your credentials!",
      email,
      password,
    };
    req.session.save(() => res.redirect("/login"));
    return;
  }

  // saving session and authenticating user
  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(() => res.redirect("/profile"));
});

router.get("/admin", async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: req.session.user.id });
  if (!user || !user.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin");
});

router.get("/profile", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;

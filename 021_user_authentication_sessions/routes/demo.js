const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
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
    console.error("Incorrect data");
    return res.redirect("/signup");
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });
  if (existingUser) {
    console.error("User already exists!");
    return res.redirect("/signup");
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
    console.error("Could not login!");
    return res.redirect("/login");
  }

  const isPasswordsEqual = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordsEqual) {
    console.error("Could not login - passwords are not equal!");
    return res.redirect("/login");
  }

  console.log("User is authenticated");
  return res.redirect("/admin");
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;

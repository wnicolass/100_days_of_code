const { Router } = require("express");
const db = require("../database/database");
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.render("posts-list");
});

router.get("/new-post", async (req, res) => {
  const authors = await db.query();
  res.render("create-post");
});

module.exports = router;

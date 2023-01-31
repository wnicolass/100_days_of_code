const { Router } = require("express");
const db = require("../database/database");
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const [postsData] = await db.query(
    `SELECT title, summary, author_name FROM posts 
    INNER JOIN authors 
    ON posts.author_id = authors.id`
  );
  res.render("posts-list", { postsData });
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors });
});

router.post("/posts", async (req, res) => {
  const { title, summary, content: body, author } = req.body;
  const data = [title, summary, body, author];
  await db.query(
    `
    INSERT INTO posts(title, summary, body, author_id)
    VALUES (?);
  `,
    [data]
  );
  res.redirect("/posts");
});

module.exports = router;

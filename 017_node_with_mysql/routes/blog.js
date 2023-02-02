const { Router } = require("express");
const db = require("../database/database");
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const [postsData] = await db.query(
    `SELECT posts.id, title, summary, author_name FROM posts 
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

router.get("/details/:id", async (req, res) => {
  const postId = req.params.id;
  const query = `
            SELECT posts.*, author_name, authors.email AS author_email FROM posts 
            INNER JOIN authors
            ON posts.author_id = authors.id
            WHERE posts.id = ?`;
  const [postData] = await db.query(query, [postId]);

  if (!postData || postData.length === 0) {
    return res.status(404).render("404");
  }

  const post = {
    ...postData[0],
    date: postData[0].created_at.toISOString(),
    humanReadableDate: postData[0].created_at.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  return res.render("post-detail", { post });
});

router.get("/edit/:id", async (req, res) => {
  const postId = req.params.id;
  const query = `
            SELECT id, title, summary, body FROM posts
            WHERE posts.id = ?`;
  const [postData] = await db.query(query, [postId]);

  if (!postData || postData.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: postData[0] });
});

router.post("/update/:id", async (req, res) => {
  const { title, summary, content } = req.body;
  const query = `
    UPDATE posts SET title = ?, summary = ?, body = ?
    WHERE id = ?     
  `;
  await db.query(query, [title, summary, content, req.params.id]);
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async (req, res) => {
  await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
  res.redirect("/posts");
});

module.exports = router;

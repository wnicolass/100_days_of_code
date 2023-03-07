const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(303).redirect("/quote");
});

router.get("/quote", (req, res) => {
  res.status(200).json({
    quote: "The book is on the table!",
  });
});

module.exports = router;

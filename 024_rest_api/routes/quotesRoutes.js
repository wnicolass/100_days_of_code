const router = require("express").Router();

const quotesController = require("../controllers/quotesController");

router.get("/", quotesController.getRandomQuote);

module.exports = router;

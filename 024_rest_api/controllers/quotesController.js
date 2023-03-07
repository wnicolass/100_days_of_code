const Quote = require("../models/quoteModel");

exports.getRandomQuote = async function (req, res, next) {
  try {
    const randomQuote = await Quote.getRandomQuote();
    return res.status(200).json({
      quote: randomQuote,
    });
  } catch (err) {
    return next(err);
  }
};

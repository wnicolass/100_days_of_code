const db = require("../data/database");

class Quote {
  static async getRandomQuote() {
    const quotes = await db.getDb().collection("quotes").find().toArray();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    return randomQuote.text;
  }
}

module.exports = Quote;

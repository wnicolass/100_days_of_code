exports.inexistingRoutes = (req, res) => {
  return res.status(404).render("404");
};

exports.serverError = (error, req, res, next) => {
  console.error(error);
  res.status(500).render("500");
};

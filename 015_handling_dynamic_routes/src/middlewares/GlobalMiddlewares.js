exports.inexistingRoutes = (req, res) => {
  return res.render("404");
};

exports.serverError = (error, req, res, next) => {
  console.error(error);
  res.render("500");
};

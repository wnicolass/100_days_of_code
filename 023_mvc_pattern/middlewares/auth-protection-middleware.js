function protectRoute(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }
  return next();
}

module.exports = protectRoute;

module.exports = {
  options: {
    getSecret: (req) => req.secret,
    secret: "my secret",
    cookieName: "x-csrf-token",
    cookieOptions: { sameSite: "strict", secure: true }, // not ideal for production, development only
    size: 128,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    getTokenFromRequest: (req) => {
      return req.body.csrfToken
        ? req.body.csrfToken
        : req.headers["x-csrf-token"];
    },
  },
};

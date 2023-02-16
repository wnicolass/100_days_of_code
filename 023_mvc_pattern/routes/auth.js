const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.get("/signup", (req, res) => {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("signup", {
    inputData: sessionInputData,
  });
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const confirmEmail = req.body["confirm-email"];

  if (!email || !password || password.length < 6 || email !== confirmEmail) {
    req.session.inputData = {
      hasError: true,
      message: "invalid input data, please check your data",
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }

  if (await User.alreadyExists(email)) {
    req.session.inputData = {
      hasError: true,
      message: "User already exists!",
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User(email, hashedPassword);
  user.save();

  res.redirect("login");
});

router.get("/login", (req, res) => {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("login", { inputData: sessionInputData });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.alreadyExists(email);

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User does not exists! Check your credentials",
      email,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }

  const arePasswordsEqual = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!arePasswordsEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - Check your credentials",
      email,
      password,
    };

    req.session.save(() => {
      res.redirect("back");
    });
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(() => {
    res.redirect("/admin");
  });
  return;
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;

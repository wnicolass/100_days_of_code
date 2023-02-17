const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  getSessionErrorData,
  flashErrorsToSession,
} = require("../utils/session-validation");
const { isValidUserData } = require("../utils/validation");

class UserController {
  getRegisterView(req, res) {
    const sessionInputData = getSessionErrorData(req, {
      email: "",
      confirmEmail: "",
      password: "",
    });
    res.render("signup", {
      inputData: sessionInputData,
    });
  }

  async register(req, res) {
    const { email, password } = req.body;
    const confirmEmail = req.body["confirm-email"];

    if (!isValidUserData(email, password, confirmEmail)) {
      flashErrorsToSession(
        req,
        {
          message: "invalid input data, please check your data",
          email,
          confirmEmail,
          password,
        },
        () => {
          res.redirect("back");
        }
      );
      return;
    }

    if (await User.alreadyExists(email)) {
      flashErrorsToSession(
        req,
        {
          message: "User already exists!",
          email,
          confirmEmail,
          password,
        },
        () => {
          res.redirect("back");
        }
      );
      return;
    }

    const user = new User(email, password);
    user.save();

    res.redirect("login");
  }

  getLoginView(req, res) {
    const sessionInputData = getSessionErrorData(req, {
      email: "",
      password: "",
    });

    res.render("login", { inputData: sessionInputData });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const existingUser = await User.alreadyExists(email);
    if (!existingUser) {
      flashErrorsToSession(
        req,
        {
          message: "User does not exists! Check your credentials",
          email,
          password,
        },
        () => {
          res.redirect("back");
        }
      );

      return;
    }
    const newUser = new User(email, password);
    const arePasswordsEqual = await newUser.login(existingUser.password);

    if (!arePasswordsEqual) {
      flashErrorsToSession(
        req,
        {
          hasError: true,
          message: "Could not log you in - Check your credentials",
          email,
          password,
        },
        () => {
          res.redirect("back");
        }
      );

      return;
    }

    req.session.user = { id: existingUser._id, email: existingUser.email };
    req.session.isAuthenticated = true;
    req.session.save(() => {
      res.redirect("/admin");
    });
    return;
  }

  logout(req, res) {
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect("/");
  }
}

module.exports = new UserController();

const router = require("express").Router();
const userController = require("../controllers/userController");
const { doubleCsrf } = require("csrf-csrf");
const { options } = require("../configs/csrfOptions");
const { doubleCsrfProtection } = doubleCsrf(options);

router.get("/signup", userController.getRegisterView);
router.post("/signup", doubleCsrfProtection, userController.register);
router.get("/login", userController.getLoginView);
router.post("/login", doubleCsrfProtection, userController.login);
router.post("/logout", userController.logout);

module.exports = router;

const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.getRegisterView);
router.post("/signup", userController.register);
router.get("/login", userController.getLoginView);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;

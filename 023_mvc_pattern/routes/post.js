const router = require("express").Router();
const PostController = require("../controllers/postController");
const { doubleCsrf } = require("csrf-csrf");
const { options } = require("../configs/csrfOptions");
const { doubleCsrfProtection } = doubleCsrf(options);
const protectRoute = require("../middlewares/auth-protection-middleware");

router.get("/", PostController.getHome);

router.use(protectRoute); //all the routes after this line will be protected  by the authentication middleware (including routes from other files)
router.get("/admin", PostController.getAdmin);
router.post("/posts", doubleCsrfProtection, PostController.createPost);
router.get("/posts/:id/edit", PostController.getSinglePost);
router.post("/posts/:id/edit", doubleCsrfProtection, PostController.updatePost);
router.post(
  "/posts/:id/delete",
  doubleCsrfProtection,
  PostController.deletePost
);

module.exports = router;

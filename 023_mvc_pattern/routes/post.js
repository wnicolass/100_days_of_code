const router = require("express").Router();
const PostController = require("../controllers/postController");

router.get("/", PostController.getHome);
router.get("/admin", PostController.getAdmin);
router.post("/posts", PostController.createPost);
router.get("/posts/:id/edit", PostController.getSinglePost);
router.post("/posts/:id/edit", PostController.updatePost);
router.post("/posts/:id/delete", PostController.deletePost);

module.exports = router;

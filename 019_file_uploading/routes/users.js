const express = require("express");
const multer = require("multer");
const router = express.Router();
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storageConfig });

router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), (req, res) => {
  const uploadedImageFile = req.file;
  const userData = req.body;

  console.log(uploadedImageFile);
  console.log(userData);

  res.redirect("/");
});

module.exports = router;

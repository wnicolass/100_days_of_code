const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../data/database");
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storageConfig });

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), async (req, res) => {
  const uploadedImageFile = req.file;
  const userData = req.body;

  try {
    await db.getDb().collection("users").insertOne({
      name: userData.username,
      imagePath: uploadedImageFile.path,
    });
  } catch (err) {
    console.error(err);
  }

  res.redirect("/");
});

module.exports = router;

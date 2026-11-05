const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { createPostController, getPostsController } = require("../controller/post.controller");
const multer = require("multer");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
});

router.get("/", authMiddleware, getPostsController);
router.post("/", authMiddleware, upload.single("image"), createPostController);

module.exports = router;
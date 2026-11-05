const postModel = require("../models/post.model");
const { generateImageCaption } = require("../services/ai.services");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function createPostController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image file is required!" });
    }

    const [imageKitResponse, caption] = await Promise.all([
      imagekit.upload({
        file: req.file.buffer,
        fileName: `post_${Date.now()}_${req.file.originalname}`,
        folder: "/instagram_posts",
      }),
      generateImageCaption(req.file.buffer, req.file.mimetype).catch((err) => {
        console.error("CAPTION FAILED >>>", err.message);
        return "";
      }),
    ]);

    const newPost = await postModel.create({
      image: imageKitResponse.url,
      imageFileId: imageKitResponse.fileId,
      caption,
      user: req.user._id,
    });

    return res.status(201).json({ success: true, message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("Error in createPostController:", error);
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error" });
  }
}

async function getPostsController(req, res) {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 }).populate("user", "username");
    return res.json({ success: true, posts });
  } catch (error) {
    console.error("GET POSTS ERROR >>>", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { createPostController, getPostsController };
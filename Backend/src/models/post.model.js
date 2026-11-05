const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    imageFileId: String,
    caption: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // user.model.js ke mongoose.model("user", ...) se match
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
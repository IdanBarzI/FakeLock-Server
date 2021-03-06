const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    image: {
      type: Buffer,
      default: "",
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

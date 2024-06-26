var mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "貼文姓名未填寫"],
    },
    tags: [
      {
        type: String,
        required: [true, "貼文標籤 tags 未填寫"],
      },
    ],
    type: {
      type: String,
      enum: ["person", "group"],
      required: [true, "貼文類型 type 未填寫"],
    },

    image: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: [true, "Content 未填寫"],
    },
    createAt: {
      type: Date,
      default: Date.now() + 8 * 60 * 60 * 1000,
      select: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: 0,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

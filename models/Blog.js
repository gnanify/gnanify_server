const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],

    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    isPublished: { type: Boolean, default: false },

    likes: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],

    dislikes: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],

    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        userName: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

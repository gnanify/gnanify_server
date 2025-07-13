// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  content: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);

// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: String,
  tags: [String],
  coverImage: String,
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  meta: {
    viewsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    reactionsCount: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);

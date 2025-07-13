const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: String,
  tags: [String],
  coverImage: String,
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  
  likes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  dislikes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  comments: [commentSchema],

  meta: {
    viewsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    reactionsCount: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);

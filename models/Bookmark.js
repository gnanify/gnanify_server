// models/Bookmark.js
const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
}, { timestamps: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);

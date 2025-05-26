const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  addComment
} = require("../controllers/blogsController");

// Create a new blog post
router.post("/create", createBlog);

// Get all published blogs
router.get("/all", getAllBlogs);

// Get a single blog by ID
router.get("/:id", getBlogById);

// Update a blog
router.put("/:id", updateBlog);

// Delete a blog
router.delete("/:id", deleteBlog);

// Like a blog
router.post("/:id/like", likeBlog);

// Dislike a blog
router.post("/:id/dislike", dislikeBlog);

// Add a comment
router.post("/:id/comment", addComment);

module.exports = router;

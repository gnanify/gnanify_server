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
  addComment,
} = require("../controllers/blogsController");

const { protect } = require("../middleware/authMiddleware");

// Public route to get all published blogs
router.get("/all", getAllBlogs);

// Public route to get single blog
router.get("/:id", getBlogById);

// Protected routes
router.post("/create", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

router.post("/:id/like", protect, likeBlog);
router.post("/:id/dislike", protect, dislikeBlog);
router.post("/:id/comment", protect, addComment);

module.exports = router;

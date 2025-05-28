const Blog = require("../models/Blog");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all published blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).populate("author", "name email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog by ID with populated fields
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.userId", "name email")
      .populate("likes.userId", "name email")
      .populate("dislikes.userId", "name email");
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog (author or admin only)
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to update this blog" });
    }

    Object.assign(blog, req.body);
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog (author or admin only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to delete this blog" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a blog
const likeBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Remove from dislikes if present
    blog.dislikes = blog.dislikes.filter((user) => user.userId.toString() !== userId.toString());

    // Toggle like
    if (blog.likes.some((user) => user.userId.toString() === userId.toString())) {
      blog.likes = blog.likes.filter((user) => user.userId.toString() !== userId.toString());
    } else {
      blog.likes.push({ userId });
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dislike a blog
const dislikeBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Remove from likes if present
    blog.likes = blog.likes.filter((user) => user.userId.toString() !== userId.toString());

    // Toggle dislike
    if (blog.dislikes.some((user) => user.userId.toString() === userId.toString())) {
      blog.dislikes = blog.dislikes.filter((user) => user.userId.toString() !== userId.toString());
    } else {
      blog.dislikes.push({ userId });
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to a blog
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text required" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.comments.push({
      userId: req.user._id,
      userName: req.user.name,
      text,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  addComment,
};

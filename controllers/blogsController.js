const Blog = require("../models/Blog");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all published blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a blog
const likeBlog = async (req, res) => {
  try {
    const { userId, userName, userEmail } = req.body;
    const blog = await Blog.findById(req.params.id);

    // Remove from dislikes if present
    blog.dislikes = blog.dislikes.filter(user => user.userId !== userId);

    // Toggle like
    if (blog.likes.some(user => user.userId === userId)) {
      blog.likes = blog.likes.filter(user => user.userId !== userId);
    } else {
      blog.likes.push({ userId, userName, userEmail });
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
    const { userId, userName, userEmail } = req.body;
    const blog = await Blog.findById(req.params.id);

    // Remove from likes if present
    blog.likes = blog.likes.filter(user => user.userId !== userId);

    // Toggle dislike
    if (blog.dislikes.some(user => user.userId === userId)) {
      blog.dislikes = blog.dislikes.filter(user => user.userId !== userId);
    } else {
      blog.dislikes.push({ userId, userName, userEmail });
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
    const { userId, userName, text } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.comments.push({ userId, userName, text });
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
  addComment
};

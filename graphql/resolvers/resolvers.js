const Blog = require("../../models/Blog");

module.exports = {
    Query: {
        getAllBlogs: async () => {
          return await Blog.find({ isPublished: true });
        },
        getBlogById: async (_, { id }) => {
          return await Blog.findById(id);
        },
      },
      

  Mutation: {
    createBlog: async (_, { input }) => {
      const blog = new Blog(input);
      return await blog.save();
    },
    updateBlog: (_, { id, input }) => Blog.findByIdAndUpdate(id, input, { new: true }),
    deleteBlog: async (_, { id }) => {
      await Blog.findByIdAndDelete(id);
      return "Blog deleted";
    },

    likeBlog: async (_, { id, userId }) => {
      const b = await Blog.findById(id);
      b.dislikes = b.dislikes.filter(u => u.userId.toString() !== userId);
      if (b.likes.some(u => u.userId.toString() === userId))
        b.likes = b.likes.filter(u => u.userId.toString() !== userId);
      else
        b.likes.push({ userId });
      return await b.save();
    },
    dislikeBlog: async (_, { id, userId }) => {
      const b = await Blog.findById(id);
      b.likes = b.likes.filter(u => u.userId.toString() !== userId);
      if (b.dislikes.some(u => u.userId.toString() === userId))
        b.dislikes = b.dislikes.filter(u => u.userId.toString() !== userId);
      else
        b.dislikes.push({ userId });
      return await b.save();
    },
    addComment: async (_, { id, comment }) => {
      const b = await Blog.findById(id);
      if (!b) throw new Error("Blog not found");
      b.comments.push(comment);
      return await b.save();
    },
  },
};

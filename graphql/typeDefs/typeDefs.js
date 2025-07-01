const { gql } = require("apollo-server-express");

module.exports = gql`
  # --- Types ---
  type Comment {
    userId: ID!
    userName: String!
    text: String!
    createdAt: String!
  }

  type Like {
    userId: ID!
  }

  type Dislike {
    userId: ID!
  }

  type Blog {
    _id: ID!
    title: String!
    content: String!
    tags: [String]
    author: ID       # 👈 Made optional to avoid null error
    isPublished: Boolean!
    likes: [Like]
    dislikes: [Dislike]
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  # --- Input Types ---
  input BlogInput {
    title: String!
    content: String!
    tags: [String]
    author: ID       # 👈 Optional in input too, in case you want to create test blogs without a user
    isPublished: Boolean
  }

  input CommentInput {
    userId: ID!
    userName: String!
    text: String!
  }

  # --- Queries ---
  type Query {
    getAllBlogs: [Blog]
    getBlogById(id: ID!): Blog
  }

  # --- Mutations ---
  type Mutation {
    createBlog(input: BlogInput!): Blog
    updateBlog(id: ID!, input: BlogInput!): Blog
    deleteBlog(id: ID!): String
    likeBlog(id: ID!, userId: ID!): Blog
    dislikeBlog(id: ID!, userId: ID!): Blog
    addComment(id: ID!, comment: CommentInput!): Blog
  }
`;

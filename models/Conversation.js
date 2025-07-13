// models/Conversation.js
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessageAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Conversation", conversationSchema);

// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);


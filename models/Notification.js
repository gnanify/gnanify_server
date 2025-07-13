// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["comment", "reaction", "connection_request", "connection_accept", "message"] },
  targetType: String,
  targetId: mongoose.Schema.Types.ObjectId,
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);

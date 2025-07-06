// models/Connection.js
const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "rejected", "blocked"], default: "pending" }
}, { timestamps: true });

connectionSchema.index({ requesterId: 1, recipientId: 1 }, { unique: true });

module.exports = mongoose.model("Connection", connectionSchema);

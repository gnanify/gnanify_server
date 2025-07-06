// models/Reaction.js
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetType: { type: String, enum: ["blog", "comment"], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ["like", "clap", "insightful"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Reaction", reactionSchema);

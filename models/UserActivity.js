const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
    pageVisits: [
      {
        page: String,
        timeSpent: Number,
        openedAt: Date,
        closedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserActivity", userActivitySchema);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");

const courseRoutes = require('./routes/courseRoutes');
const blogRoutes = require("./routes/blogs");
const learningContentRoutes = require("./routes/learningContentRoutes");
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Use course routes
app.use("/api/auth", authRoutes);
app.use('/api/course', courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/learn", learningContentRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

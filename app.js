const express = require("express");
const cors = require("cors");

const courseRoutes = require('./routes/courseRoutes');
const blogRoutes = require("./routes/blogs");
const learningContentRoutes = require("./routes/learningContentRoutes");
const authRoutes=require("./routes/auth")
const app = express();

app.use(cors());

// Use JSON parsing only on REST routes to avoid conflicts with Apollo Server
app.use('/api/course', express.json(), courseRoutes);
app.use('/api/blogs', express.json(), blogRoutes);
app.use('/api/learn', express.json(), learningContentRoutes);
app.use("/api/auth", express.json(), authRoutes);
module.exports = app;

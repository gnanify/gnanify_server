const mongoose = require('mongoose');
const Subtopic = require('./Subtopic');  // Import the Subtopic model

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subtopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic' }]  // Reference to Subtopic model
});

module.exports = mongoose.model('Course', CourseSchema);

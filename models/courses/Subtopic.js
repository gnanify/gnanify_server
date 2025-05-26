const mongoose = require('mongoose');
const SubSubtopic = require('./SubSubtopic');  // Import SubSubtopic schema

const SubtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subsubtopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSubtopic' }]  // Reference to SubSubtopic model
});

module.exports = mongoose.model('Subtopic', SubtopicSchema);

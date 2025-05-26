const mongoose = require('mongoose');

const SubSubtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoLink: String,
  article: String,
  pdfUrl: String,
  notes: String
});

module.exports = mongoose.model('SubSubtopic', SubSubtopicSchema);

const mongoose = require("mongoose");

// Sub-Subtopic Schema
const subSubtopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    resources: [{ type: String }]  // Optional resources
});

// Subtopic Schema
const subtopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    resources: [{ type: String }],
    subsubtopics: [subSubtopicSchema]  // Nested sub-subtopics
});

// Topic Schema
const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subtopics: [subtopicSchema]  // Subtopics of each topic
});

// Main Schema for Learning Content
const learningContentSchema = new mongoose.Schema({
    language: { type: String, required: true },
    topics: [topicSchema]  // Topics related to each language
});

// Create the model
const LearningContent = mongoose.model("LearningContent", learningContentSchema);
module.exports = LearningContent;

const LearningContent = require("../models/learningContent");

// Get all learning content
exports.getAllLearningContent = async (req, res) => {
    try {
        const learningContent = await LearningContent.find();
        res.json(learningContent);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Create new learning content
exports.createLearningContent = async (req, res) => {
    const { language, topics } = req.body;
    try {
        const newContent = new LearningContent({
            language,
            topics
        });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(400).json({ message: "Error creating content", error: err.message });
    }
};

// Get content by language
exports.getLearningContentByLanguage = async (req, res) => {
    const { language } = req.params;
    try {
        const content = await LearningContent.find({ language });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Update a subtopic under a specific language and topic
exports.updateSubtopic = async (req, res) => {
    const { language, topicId, subtopicId } = req.params;
    const { title, description, content, resources } = req.body;
    try {
        const learningContent = await LearningContent.findOne({ language });
        const topic = learningContent.topics.id(topicId);
        const subtopic = topic.subtopics.id(subtopicId);

        if (!subtopic) {
            return res.status(404).json({ message: "Subtopic not found" });
        }

        subtopic.title = title || subtopic.title;
        subtopic.description = description || subtopic.description;
        subtopic.content = content || subtopic.content;
        subtopic.resources = resources || subtopic.resources;

        await learningContent.save();
        res.json(subtopic);
    } catch (err) {
        res.status(500).json({ message: "Error updating subtopic", error: err.message });
    }
};

// Delete a subtopic under a specific language and topic
exports.deleteSubtopic = async (req, res) => {
    const { language, topicId, subtopicId } = req.params;
    try {
        const learningContent = await LearningContent.findOne({ language });
        const topic = learningContent.topics.id(topicId);
        const subtopic = topic.subtopics.id(subtopicId);

        if (!subtopic) {
            return res.status(404).json({ message: "Subtopic not found" });
        }

        subtopic.remove();
        await learningContent.save();
        res.json({ message: "Subtopic deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting subtopic", error: err.message });
    }
};

// Update a sub-subtopic under a specific subtopic
exports.updateSubSubtopic = async (req, res) => {
    const { language, topicId, subtopicId, subsubtopicId } = req.params;
    const { title, description, content, resources } = req.body;
    try {
        const learningContent = await LearningContent.findOne({ language });
        const topic = learningContent.topics.id(topicId);
        const subtopic = topic.subtopics.id(subtopicId);
        const subsubtopic = subtopic.subsubtopics.id(subsubtopicId);

        if (!subsubtopic) {
            return res.status(404).json({ message: "Sub-subtopic not found" });
        }

        subsubtopic.title = title || subsubtopic.title;
        subsubtopic.description = description || subsubtopic.description;
        subsubtopic.content = content || subsubtopic.content;
        subsubtopic.resources = resources || subsubtopic.resources;

        await learningContent.save();
        res.json(subsubtopic);
    } catch (err) {
        res.status(500).json({ message: "Error updating sub-subtopic", error: err.message });
    }
};

// Delete a sub-subtopic under a specific subtopic
exports.deleteSubSubtopic = async (req, res) => {
    const { language, topicId, subtopicId, subsubtopicId } = req.params;
    try {
        const learningContent = await LearningContent.findOne({ language });
        const topic = learningContent.topics.id(topicId);
        const subtopic = topic.subtopics.id(subtopicId);
        const subsubtopic = subtopic.subsubtopics.id(subsubtopicId);

        if (!subsubtopic) {
            return res.status(404).json({ message: "Sub-subtopic not found" });
        }

        subsubtopic.remove();
        await learningContent.save();
        res.json({ message: "Sub-subtopic deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting sub-subtopic", error: err.message });
    }
};

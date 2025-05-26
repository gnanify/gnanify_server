const Subsubtopic = require('../../models/courses/SubSubtopic');
const Subtopic = require('../../models/courses/Subtopic');

// Create a new subsubtopic
exports.createSubsubtopic = async (req, res) => {
  try {
    const subsubtopic = new Subsubtopic(req.body);
    await subsubtopic.save();

    // Find the related subtopic and add the new subsubtopic to it
    const subtopic = await Subtopic.findById(req.body.subtopicId);
    if (!subtopic) return res.status(404).json({ message: 'Subtopic not found' });

    subtopic.subsubtopics.push(subsubtopic);
    await subtopic.save();

    res.status(201).json(subsubtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subsubtopics of a subtopic
exports.getSubsubtopicsBySubtopicId = async (req, res) => {
  try {
    const subtopic = await Subtopic.findById(req.params.subtopicId).populate('subsubtopics');
    if (!subtopic) return res.status(404).json({ message: 'Subtopic not found' });
    res.status(200).json(subtopic.subsubtopics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single subsubtopic by ID
exports.getSubsubtopicById = async (req, res) => {
  try {
    const subsubtopic = await Subsubtopic.findById(req.params.id);
    if (!subsubtopic) return res.status(404).json({ message: 'Subsubtopic not found' });
    res.status(200).json(subsubtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a subsubtopic
exports.updateSubsubtopic = async (req, res) => {
  try {
    const subsubtopic = await Subsubtopic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subsubtopic) return res.status(404).json({ message: 'Subsubtopic not found' });
    res.status(200).json(subsubtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subsubtopic
exports.deleteSubsubtopic = async (req, res) => {
  try {
    const subsubtopic = await Subsubtopic.findByIdAndDelete(req.params.id);
    if (!subsubtopic) return res.status(404).json({ message: 'Subsubtopic not found' });
    res.status(200).json({ message: 'Subsubtopic deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

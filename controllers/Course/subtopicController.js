const Subtopic = require('../../models/courses/Subtopic');
const Course = require('../../models/courses/Course');

// Create a new subtopic
exports.createSubtopic = async (req, res) => {
  try {
    const subtopic = new Subtopic(req.body);
    await subtopic.save();

    // Add the new subtopic to the course
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.subtopics.push(subtopic);
    await course.save();

    res.status(201).json(subtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subtopics of a course
exports.getSubtopicsByCourseId = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('subtopics');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course.subtopics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single subtopic by ID
exports.getSubtopicById = async (req, res) => {
  try {
    const subtopic = await Subtopic.findById(req.params.id);
    if (!subtopic) return res.status(404).json({ message: 'Subtopic not found' });
    res.status(200).json(subtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a subtopic
exports.updateSubtopic = async (req, res) => {
  try {
    const subtopic = await Subtopic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subtopic) return res.status(404).json({ message: 'Subtopic not found' });
    res.status(200).json(subtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subtopic
exports.deleteSubtopic = async (req, res) => {
  try {
    const subtopic = await Subtopic.findByIdAndDelete(req.params.id);
    if (!subtopic) return res.status(404).json({ message: 'Subtopic not found' });
    res.status(200).json({ message: 'Subtopic deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

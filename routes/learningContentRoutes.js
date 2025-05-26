const express = require("express");
const router = express.Router();
const learningContentController = require("../controllers/learningContentController");

// Get all learning content
router.get("/learning-content", learningContentController.getAllLearningContent);

// Create new learning content
router.post("/learning-content", learningContentController.createLearningContent);

// Get learning content by language (e.g., Python)
router.get("/learning-content/:language", learningContentController.getLearningContentByLanguage);

// Update a subtopic under a specific language and topic
router.put("/learning-content/:language/:topicId/subtopic/:subtopicId", learningContentController.updateSubtopic);

// Delete a subtopic under a specific language and topic
router.delete("/learning-content/:language/:topicId/subtopic/:subtopicId", learningContentController.deleteSubtopic);

// Update a sub-subtopic under a specific subtopic
router.put("/learning-content/:language/:topicId/subtopic/:subtopicId/subsubtopic/:subsubtopicId", learningContentController.updateSubSubtopic);

// Delete a sub-subtopic under a specific subtopic
router.delete("/learning-content/:language/:topicId/subtopic/:subtopicId/subsubtopic/:subsubtopicId", learningContentController.deleteSubSubtopic);

module.exports = router;

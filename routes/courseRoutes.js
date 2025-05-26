const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/Course/courseController');
const SubtopicController = require('../controllers/Course/subtopicController');
const SubsubtopicController = require('../controllers/Course/subSubtopicController');

// Course Routes
router.post('/courses', CourseController.createCourse);
router.get('/courses', CourseController.getAllCourses);
router.get('/courses/:id', CourseController.getCourseById);
router.put('/courses/:id', CourseController.updateCourse);
router.delete('/courses/:id', CourseController.deleteCourse);

// Subtopic Routes
router.post('/subtopics', SubtopicController.createSubtopic);
router.get('/courses/:courseId/subtopics', SubtopicController.getSubtopicsByCourseId);
router.get('/subtopics/:id', SubtopicController.getSubtopicById);
router.put('/subtopics/:id', SubtopicController.updateSubtopic);
router.delete('/subtopics/:id', SubtopicController.deleteSubtopic);

// Subsubtopic Routes
router.post('/subsubtopics', SubsubtopicController.createSubsubtopic);
router.get('/subtopics/:subtopicId/subsubtopics', SubsubtopicController.getSubsubtopicsBySubtopicId);
router.get('/subsubtopics/:id', SubsubtopicController.getSubsubtopicById);
router.put('/subsubtopics/:id', SubsubtopicController.updateSubsubtopic);
router.delete('/subsubtopics/:id', SubsubtopicController.deleteSubsubtopic);

module.exports = router;

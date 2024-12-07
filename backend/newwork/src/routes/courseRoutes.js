const express = require("express");
const { fetchCourses } = require("../controllers/courseController");

const router = express.Router();

// Route for fetching courses
router.get("/courses", fetchCourses);

module.exports = router;
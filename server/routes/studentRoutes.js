const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} = require("../controllers/studentController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect); // all routes below require login

router.get("/stats/dashboard", getDashboardStats);
router.get("/", getStudents);
router.get("/:id", getStudentById);

// Only admin can create, update, delete
router.post("/", authorize("admin"), createStudent);
router.put("/:id", authorize("admin"), updateStudent);
router.delete("/:id", authorize("admin"), deleteStudent);

module.exports = router;

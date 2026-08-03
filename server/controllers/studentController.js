const Student = require("../models/Student");

// @desc   Get all students (with search & filter)
// @route  GET /api/students?search=&department=&year=
const getStudents = async (req, res) => {
  try {
    const { search, department, year } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (department) query.department = { $regex: department, $options: "i" };
    if (year) query.year = year;

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single student
// @route  GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create a student
// @route  POST /api/students
const createStudent = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Update a student
// @route  PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Delete a student
// @route  DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Dashboard statistics
// @route  GET /api/students/stats/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const departmentStats = await Student.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
    ]);

    const yearStats = await Student.aggregate([
      { $group: { _id: "$year", count: { $sum: 1 } } },
    ]);

    const genderStats = await Student.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);

    res.json({ totalStudents, departmentStats, yearStats, genderStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
};

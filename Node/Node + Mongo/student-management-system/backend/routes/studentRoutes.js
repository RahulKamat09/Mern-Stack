const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const router = express.Router();


// GET all students
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const students = await db
      .collection("students")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
});


// ADD student
router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const { name, email, phone, course, age, city } = req.body;

    if (!name || !email || !phone || !course || !age || !city) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingStudent = await db
      .collection("students")
      .findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student with this email already exists",
      });
    }

    const newStudent = {
      name,
      email,
      phone,
      course,
      age: Number(age),
      city,
      createdAt: new Date(),
    };

    const result = await db
      .collection("students")
      .insertOne(newStudent);

    res.status(201).json({
      message: "Student added successfully",
      studentId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
});


// GET single student
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();

    const student = await db
      .collection("students")
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student",
      error: error.message,
    });
  }
});


// UPDATE student
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();

    const { name, email, phone, course, age, city } = req.body;

    const updatedStudent = {
      name,
      email,
      phone,
      course,
      age: Number(age),
      city,
      updatedAt: new Date(),
    };

    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedStudent }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
});


// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("students").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

module.exports = router;
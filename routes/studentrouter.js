const express = require("express");
const studentmodel = require("../models/studentmodel");

const router = express.Router();

// GET: Get all students API
router.get("/allstudents", async (req, res) => {
  try {
    const allstudents = await studentmodel.find();
    const totalStudents = allstudents.length;
    res.status(200).json({
      noofstudents: totalStudents,
      students: allstudents,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// GET: Get one student API
router.get("/onestudent/:id", async (req, res) => {
  try {
    const onestudent = await studentmodel.findById(req.params.id);
    res.status(200).json(onestudent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// POST: Add student API
router.post("/addstudent", async (req, res) => {
  // Create a new student model
  const addstudent = new studentmodel({
    name: req.body.name,
    rollno: req.body.rollno,
    branch: req.body.branch,
    age: req.body.age,
    gender: req.body.gender,
  });

  try {
    // Save the new student to the database
    const saveaddstudent = await addstudent.save();
    res.status(201).json(saveaddstudent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// PATCH: Update student API
router.patch("/updatestudent/:id", async (req, res) => {
  try {
    // Get the ID of the student to update
    const id = req.params.id;

    // Get the updated data for the student
    const dataupdate = req.body;

    // Options for the update operation
    const options = { new: true };

    // Update the student in the database
    const updateStudent = await studentmodel.findByIdAndUpdate(
      id,
      dataupdate,
      options
    );
    res.status(201).json(updateStudent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE: Delete student API
router.delete("/deletestudent/:id", async (req, res) => {
  try {
    // Get the ID of the student to delete
    const id = req.params.id;

    // Delete the student from the database
    const deleteStudent = await studentmodel.findByIdAndDelete(id);

    res.status(200).json({
      message: `Successfully deleted `,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE: Delete all students API
router.delete("/deleteallstudents", async (req, res) => {
  try {
    // Delete all students from the database
    const result = await studentmodel.deleteMany({});

    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} students`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;

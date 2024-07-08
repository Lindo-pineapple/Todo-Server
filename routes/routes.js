const express = require("express");
const TodoModel = require("../Models/TodoModel");
const mongoose = require("mongoose");

const router = express.Router();

//Create Todo
router.post("/", async (req, res) => {
  const todo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todo: req.body.todo,
    description: req.body.description,
    isDone: req.body.isDone,
  });

  try {
    const dataToSave = await todo.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Todo's
router.get("/", async (req, res) => {
  try {
    const data = await TodoModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get Todo by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await TodoModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Todo by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await TodoModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete Todo by ID
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;

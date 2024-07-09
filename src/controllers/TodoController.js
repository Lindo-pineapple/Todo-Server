const TodoModel = require("../models/TodoModel");
import GLOBALS from "../globals";
import mongoose from "mongoose";

const {
  ACCESS_LEVELS,
  HTTP_CODES,
  SUBCATEGORY_MAP,
  PARENT_CATEGORY_MAP,
  API,
  USER_ID,
  DEFAULT_ERROR_MESSAGE,
  ALL_RISK_EXCESS_CODES,
} = GLOBALS;

export async function createTodo(req, res) {
  const todo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todo: req.body.todo,
    description: req.body.description,
    isDone: req.body.isDone,
  });
  try {
    const dataToSave = await todo.save();
    res.status(201).json(dataToSave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTodos(req, res) {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTodo(req, res) {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateTodo(req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await TodoModel.findByIdAndUpdate(id, updatedData, options);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    const data = await TodoModel.findByIdAndDelete(id);

    if (data) {
      res.send(`Document with ${data.name} has been deleted..`);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

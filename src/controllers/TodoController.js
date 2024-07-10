import { HTTP_CODES, DEFAULT_ERROR_MESSAGE } from "../globals.js";
import TodoModel from "../models/TodoModel.js";

export async function createTodo(req, res) {
  const todo = new TodoModel({
    todo: req.body.todo,
    description: req.body.description,
    isDone: req.body.isDone,
    userId: req.user.id,
  });
  try {
    const dataToSave = await todo.save();
    res.status(HTTP_CODES.CREATED).json(dataToSave);
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

export async function getTodos(req, res) {
  try {
    const todos = await TodoModel.find({ userId: req.user.id });
    res.status(HTTP_CODES.OK).json(todos);
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

export async function getTodo(req, res) {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (todo) {
      res.status(HTTP_CODES.OK).json(todo);
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ message: "Todo not found" });
    }
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

export async function updateTodo(req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await TodoModel.findByIdAndUpdate(id, updatedData, options);
    if (result) {
      res.status(HTTP_CODES.ACCEPTED).json(result);
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ message: "Todo not found" });
    }
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

export async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    const result = await TodoModel.findByIdAndDelete(id);
    if (result) {
      res.send(`Todo: "${result.todo}" has been deleted..`);
    } else {
      res.status(HTTP_CODES.NO_CONTENT).json({ message: "Todo not found" });
    }
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

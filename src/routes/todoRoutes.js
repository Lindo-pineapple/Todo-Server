import { Router } from 'express';
import {getTodo, getTodos, updateTodo, deleteTodo, createTodo} from '../Controllers/TodoController'

const router = Router();

//Create Todo
router.post("/", createTodo);

//Get all Todo's
router.get("/", getTodos);

//Get Todo by ID
router.get("/:id", getTodo);

//Update Todo by ID
router.patch("/update/:id", updateTodo);

//Delete Todo by ID
router.delete("/delete/:id", deleteTodo);

module.exports = router;

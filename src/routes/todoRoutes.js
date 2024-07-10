import { Router } from "express";
import {
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  createTodo,
} from "../controllers/TodoController.js";

const router = Router();

//Create Todo
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new Todo
 *     tags: [todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/todos'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/todos'
 */
router.post("/", createTodo);

//Get all Todo's
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Retrieve a list of all todos
 *     tags: [todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/todos'
 */
router.get("/", getTodos);

//Get Todo by ID
/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Retrieve details of a specific todo
 *     tags: [todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the todo to retrieve
 *     responses:
 *       200:
 *         description: A specific todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/todos'
 */
router.get("/:id", getTodo);

//Update Todo by ID
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update todo information
 *     tags: [todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/todos'
 *     responses:
 *       200:
 *         description: todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/todos'
 */
router.patch("/update/:id", updateTodo);

//Delete Todo by ID
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete("/delete/:id", deleteTodo);

export default router;

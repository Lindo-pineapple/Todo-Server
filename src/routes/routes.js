import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import TodoRoutes from "./todoRoutes.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use("/todos", auth, TodoRoutes);
router.use("/users", UserRoutes);

export default router;

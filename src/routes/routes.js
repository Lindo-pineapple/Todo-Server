import { Router } from "express";
import userRoutes from "./userRoutes";
import todoRoutes from "./todoRoutes";

const router = Router();

router.use("/todos", auth, todoRoutes);
router.use("/users", userRoutes);

module.exports = router;

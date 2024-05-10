import { Router } from "express";
import AuthValidator from "../validations/Validate.js";
import AuthController from "../controllers/auth-controller.js";
import DataController from "../controllers/data-controller.js";

const router = Router();

router.post("/auth", AuthValidator.signIn, AuthController.signIn);
router.post("/registration", AuthValidator.signUp, AuthController.signUp);

router.post("/a/user",DataController.getInfoUser);
router.post("/a/users", DataController.getAllUsers)
router.post("/a/create",DataController.setTasks);
router.post("/a/all-tasks",DataController.getTasks);
router.post("/a/task-by-id",DataController.getTaskById);
router.post("/a/update-task",DataController.updateTask);

export default router;
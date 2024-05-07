import { Router } from "express";
import AuthValidator from "../validations/Validate.js";
import AuthController from "../controllers/auth-controller.js";

const router = Router();

router.post("/auth", AuthValidator.signIn, AuthController.signIn);
router.post("/registration", AuthValidator.signUp, AuthController.signUp);



export default router;
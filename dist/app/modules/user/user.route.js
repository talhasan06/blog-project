import express from "express";
import { UserControllers } from "./user.controller.js";
import { UserValidationSchema } from "./user.validation.js";
import { AuthValidation } from "../auth/auth.validation.js";
import { AuthControllers } from "../auth/auth.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
const router = express.Router();
//will call controller function
router.get("/", UserControllers.getAllUser);
router.post("/register", validateRequest(UserValidationSchema.userCreateValidationSchema), UserControllers.createUser);
router.post("/login", validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);
export const UserRoutes = router;

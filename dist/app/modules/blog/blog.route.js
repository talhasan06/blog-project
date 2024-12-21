import express from "express";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../user/user.constant.js";
import { BlogControllers } from "./blog.controller.js";
import { BlogValidations } from "./blog.validation.js";
import validateRequest from "../../middlewares/validateRequest.js";
const router = express.Router();
//will call controller function
router.post("/", auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(BlogValidations.createValidationSchema), BlogControllers.createBlog);
// router.get("/:id", BlogControllers.getSingleBlog);
router.patch("/:id", auth(USER_ROLE.user), validateRequest(BlogValidations.updateValidationSchema), BlogControllers.updateBlog);
router.get("/", BlogControllers.getAllBlog);
router.delete("/:id", auth(USER_ROLE.user), BlogControllers.deleteBlog);
export const BlogRoutes = router;

import express from "express";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../user/user.constant.js";
import { AdminControllers } from "./admin.controller.js";

const router = express.Router();
router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  AdminControllers.blockUser
);
router.delete("/blogs/:id", auth(USER_ROLE.admin), AdminControllers.deleteBlog);

export const AdminRoutes = router;

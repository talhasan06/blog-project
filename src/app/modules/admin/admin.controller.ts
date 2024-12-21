import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { AdminServices } from "./admin.services.js";
import { sendResponse } from "../../utils/response.js";

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await AdminServices.blockUserFromDB(userId);
  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: httpStatus.OK,
  });
});

const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  await AdminServices.deleteBlogFromDB(blogId);
  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};

import { RequestHandler } from "express";
import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync.js";
import { BlogServices } from "./blog.service.js";
import { sendResponse } from "../../utils/response.js";

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const userId = (req.user as JwtPayload).userId;
  const result = await BlogServices.createBlog(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog created successfully",
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});

const getAllBlog: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogFromDB(req.query);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "blog retrieved successfully",
    data: result,
  });
});

const getSingleBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const result = await BlogServices.getSingleBlogFromDB(blogId);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog fetched successfully",
    data: result,
  });
});

const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const payload = req.body;
  const result = await BlogServices.updateBlogFromDB(blogId, payload);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const userId = (req.user as JwtPayload).userId;
  await BlogServices.deleteBlogFromDB(blogId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

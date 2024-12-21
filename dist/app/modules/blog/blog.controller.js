import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { BlogServices } from "./blog.service.js";
import { sendResponse } from "../../utils/response.js";
const createBlog = catchAsync(async (req, res) => {
    const userId = req.user.userId;
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
const getAllBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.getAllBlogFromDB(req.query);
    // send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "blog retrieved successfully",
        data: result,
    });
});
const getSingleBlog = catchAsync(async (req, res) => {
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
const updateBlog = catchAsync(async (req, res) => {
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
const deleteBlog = catchAsync(async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;
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

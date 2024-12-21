import httpStatus from "http-status";
import { Blog } from "./blog.model.js";
import QueryBuilder from "../../builder/QueryBuilder.js";
import { BlogSearchableFields } from "./blog.constant.js";
import ApiError from "../../errors/ApiError.js";
const createBlog = async (payload, userId) => {
    const blog = await Blog.create({
        ...payload,
        author: userId,
    });
    const result = await Blog.findById(blog._id).populate({
        path: "author",
        select: "-role -__v -createdAt -updatedAt",
    });
    return result;
};
const getAllBlogFromDB = async (query) => {
    const blogQuery = new QueryBuilder(Blog.find()
        .populate({
        path: "author",
        select: "-role -__v -createdAt -updatedAt",
    })
        .select("-__v -updatedAt -isDeleted"), query)
        .search(BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await blogQuery.modelQuery;
    return result;
};
const getSingleBlogFromDB = async (blogId) => {
    const result = await Blog.findById(blogId)
        .populate({
        path: "author",
        select: "-role -__v -createdAt -updatedAt",
    })
        .select("-__v -createdAt -updatedAt");
    return result;
};
const updateBlogFromDB = async (blogId, payload) => {
    // Remove author field from payload if it exists
    const { author, ...remainingBlogData } = payload;
    const result = await Blog.findByIdAndUpdate(blogId, remainingBlogData, {
        new: true,
    })
        .populate({
        path: "author",
        select: "-role -__v -createdAt -updatedAt",
    })
        .select("-__v -createdAt -updatedAt");
    return result;
};
const deleteBlogFromDB = async (blogId, userId) => {
    const findBlog = await Blog.findById(blogId);
    if (!findBlog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
    }
    if (findBlog.author._id.toString() !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid request");
    }
    const result = await Blog.findByIdAndDelete(blogId);
    return result;
};
export const BlogServices = {
    createBlog,
    getAllBlogFromDB,
    getSingleBlogFromDB,
    updateBlogFromDB,
    deleteBlogFromDB,
};
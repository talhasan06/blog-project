import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import { User } from "../user/user.model.js";
import { Blog } from "../blog/blog.model.js";

const blockUserFromDB = async (userId: string) => {
  const findUser = await User.findById(userId);
  if (!findUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  if (findUser.isBlocked) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already blocked");
  }

  const result = await User.findByIdAndUpdate(userId, {
    isBlocked: true,
  });
  return result;
};

const deleteBlogFromDB = async (blogId: string) => {
  const findBlog = await Blog.findById(blogId);
  if (!findBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const result = await Blog.findByIdAndDelete(blogId, {
    new: true,
  });
  return result;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};

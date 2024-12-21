import { RequestHandler } from "express";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { UserServices } from "./user.service.js";
import { errorResponse, sendResponse } from "../../utils/response.js";
import config from "../../config/index.js";

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);

    sendResponse(res, {
      success: true,
      message: "User registered successfully",
      statusCode: httpStatus.CREATED,
      data: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (err) {
    errorResponse(res, {
      success: false,
      message: "Validation error",
      statusCode: httpStatus.BAD_REQUEST,
      error: err instanceof Error ? err.message : "Something went wrong",
      stack:
        config.node_env === "development"
          ? err instanceof Error
            ? err.stack
            : undefined
          : undefined,
    });
    next(err);
  }
});

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  // will call service function to send this data
  const result = await UserServices.getAllUsersFromDB();

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
};

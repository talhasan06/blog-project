import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { AuthServices } from "./auth.service.js";
import { sendResponse } from "../../utils/response.js";
import config from "../../config/index.js";
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config.node_env === "production",
        httpOnly: true,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login successful",
        data: {
            accessToken,
        },
    });
});
const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password updated successfully",
        data: result,
    });
});
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token is retrieved successfully",
        data: result,
    });
});
export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
};

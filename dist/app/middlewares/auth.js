import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../errors/ApiError.js";
import config from "../config/index.js";
import { User } from "../modules/user/user.model.js";
const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }
        // checking if the given token is valid
        const decoded = jwt.verify(token, config.jwt_access_secret);
        const { userId, userEmail, role, iat } = decoded;
        // checking if the user is exist
        const user = await User.isUserExistsByEmail(userEmail);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
        }
        // checking if the user is already blocked
        const isBlocked = user?.isBlocked;
        if (isBlocked) {
            throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked !");
        }
        if (user.passwordChangedAt &&
            User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
        }
        req.user = { userId, userEmail, role };
        next();
    });
};
export default auth;

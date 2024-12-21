import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import ApiError from "../../errors/ApiError.js";
import config from "../../config/index.js";
import { User } from "../user/user.model.js";
import { TLoginUser } from "./auth.interface.js";
import { createToken } from "./auth.utils.js";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  const isBlocked = user?.isBlocked;
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );

  // Check for invalid credentials (wrong email or password)
  if (!user || !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // Check if user is blocked (separate business logic)
  if (isBlocked) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is Blocked");
  }

  // create token and send to the client

  const jwtPayload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistsByEmail(userData.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user not found");
  }

  //checking if the user is already deleted
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked");
  }

  // checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  //hash new password

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { userEmail, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user email is not found !");
  }

  // checking if the user is blocked
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const jwtPayload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};

import ApiError from "../../errors/ApiError.js";
import { TUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUserIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload?.email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};

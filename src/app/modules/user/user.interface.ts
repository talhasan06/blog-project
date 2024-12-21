import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant.js";
export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

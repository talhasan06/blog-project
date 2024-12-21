import { Types } from "mongoose";

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

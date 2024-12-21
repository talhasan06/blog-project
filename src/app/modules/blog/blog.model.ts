import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface.js";

const blogSchema = new Schema<TBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Blog = model<TBlog>("Blog", blogSchema);

import { z } from "zod";
const createValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").trim(),
        content: z.string().min(1, "Content is required"),
        isPublished: z.boolean().optional().default(true),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    }),
});
const updateValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").trim(),
        content: z.string().min(1, "Content is required"),
    }),
});
export const BlogValidations = {
    createValidationSchema,
    updateValidationSchema,
};

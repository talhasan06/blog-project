import { z } from "zod";
export const userCreateValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(1, "Name is required")
            .max(50, "Name cannot exceed 50 characters")
            .trim(),
        email: z.string().email("Please use a valid email address").trim(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password cannot exceed 100 characters"),
    }),
});
// Example validation
export const UserValidationSchema = {
    userCreateValidationSchema,
};

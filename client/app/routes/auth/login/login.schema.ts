import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(1, "Password must be at least 1 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

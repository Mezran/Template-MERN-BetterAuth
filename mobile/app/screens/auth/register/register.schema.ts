import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 character"),
  name: z.string().min(1, "Name must be at least 1 character"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

import { z } from "zod";

export const accountUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(1, "Name must be at least 1 characters")
    .max(50, "Name must not exceed 50 characters"),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type AccountUpdateFormData = z.infer<typeof accountUpdateSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

// Keep the old schema for backward compatibility
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(1, "Name must be at least 1 characters")
    .max(50, "Name must not exceed 50 characters"),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

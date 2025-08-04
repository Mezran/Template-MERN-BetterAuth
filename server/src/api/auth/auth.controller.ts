import mongoose from "mongoose";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Initialize BetterAuth
export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection as any),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disabled for simplicity
    minPasswordLength: 1,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:6789",
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
});

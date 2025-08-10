import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Better-auth server URL
  credentials: "include", // Include cookies in requests
});

// Type definitions for better-auth
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    ipAddress?: string;
    userAgent?: string;
  };
  user: User;
}

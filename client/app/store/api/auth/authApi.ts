import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { authClient } from "./betterAuth";

/**
 * RTK Query API using better-auth client methods
 *
 * This implementation uses `fakeBaseQuery` to integrate better-auth client
 * directly with RTK Query, ensuring type safety and proper error handling.
 * The endpoints always align with better-auth's API and headers are
 * automatically handled by the better-auth client.
 */

// Types for auth operations
interface RegisterRequest {
  email: string;
  password: string;
  name: string; // Required by better-auth
}

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface RegisterResponse {
  token: string | null;
  user: User;
}

interface LoginResponse {
  redirect: boolean;
  token: string;
  url?: string;
  user: User;
}

interface SessionResponse {
  user: User | null;
  session: {
    id: string;
    userId: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
  } | null;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Auth", "Session"],
  endpoints: (builder) => ({
    // Register endpoint
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      queryFn: async (credentials) => {
        try {
          const result = await authClient.signUp.email(credentials);
          if (result.error) {
            return { error: result.error };
          }
          return { data: result.data as RegisterResponse };
        } catch (error) {
          return { error: { message: "Registration failed", error } };
        }
      },
      invalidatesTags: ["Auth", "Session"],
    }),

    // Login endpoint
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (credentials) => {
        try {
          const result = await authClient.signIn.email(credentials);
          if (result.error) {
            return { error: result.error };
          }
          return { data: result.data as LoginResponse };
        } catch (error) {
          return { error: { message: "Login failed", error } };
        }
      },
      invalidatesTags: ["Auth", "Session"],
    }),

    // Get session endpoint
    getSession: builder.query<SessionResponse, void>({
      queryFn: async () => {
        try {
          const result = await authClient.getSession();
          if (result.error) {
            return { error: result.error };
          }
          return { data: result.data as SessionResponse };
        } catch (error) {
          return { error: { message: "Failed to get session", error } };
        }
      },
      providesTags: ["Session"],
    }),

    // Logout endpoint
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          const result = await authClient.signOut();
          if (result.error) {
            return { error: result.error };
          }
          return { data: undefined };
        } catch (error) {
          return { error: { message: "Logout failed", error } };
        }
      },
      invalidatesTags: ["Auth", "Session"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetSessionQuery,
  useLogoutMutation,
} = authApi;

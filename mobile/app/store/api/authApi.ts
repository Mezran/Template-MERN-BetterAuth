import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { authClient } from "./betterAuth";

/**
 * RTK Query API using better-auth client methods for mobile
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

interface UpdateUserRequest {
  name: string;
}

interface UpdateUserResponse {
  user: User;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: string; // Serialized as ISO string
  updatedAt: string; // Serialized as ISO string
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
    createdAt: string; // Serialized as ISO string
    updatedAt: string; // Serialized as ISO string
    expiresAt: string; // Serialized as ISO string
  } | null;
}

// Helper function to transform dates in response objects
const transformDates = (obj: any): any => {
  if (!obj) return obj;

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(transformDates);
  }

  if (typeof obj === "object") {
    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      transformed[key] = transformDates(value);
    }
    return transformed;
  }

  return obj;
};

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
          return { data: transformDates(result.data) };
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
          return { data: transformDates(result.data) };
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
          return { data: transformDates(result.data) };
        } catch (error) {
          return { error: { message: "Failed to get session", error } };
        }
      },
      providesTags: ["Session"],
    }),

    // Logout endpoint
    logout: builder.mutation<{ success: boolean }, void>({
      queryFn: async () => {
        try {
          const result = await authClient.signOut();
          console.log(result);
          if (result.error) {
            return { error: result.error };
          }
          return { data: result.data || { success: true } };
        } catch (error) {
          return { error: { message: "Logout failed", error } };
        }
      },
      invalidatesTags: ["Auth", "Session"],
    }),

    // Update user endpoint
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      queryFn: async (userData) => {
        try {
          const result = await authClient.updateUser(userData);
          if (result.error) {
            return { error: result.error };
          }
          return { data: transformDates(result.data) };
        } catch (error) {
          return { error: { message: "Failed to update user", error } };
        }
      },
      invalidatesTags: ["Session"],
    }),

    // Change password endpoint
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      queryFn: async (passwordData) => {
        try {
          const result = await authClient.changePassword(passwordData);
          if (result.error) {
            return { error: result.error };
          }
          return { data: transformDates(result.data) };
        } catch (error) {
          return { error: { message: "Failed to change password", error } };
        }
      },
      invalidatesTags: ["Session"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetSessionQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = authApi;

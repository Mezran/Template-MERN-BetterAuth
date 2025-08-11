import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../store/store";
import {
  useGetSessionQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../store/api/authApi";

// Login form validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 character"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);

  // RTK Query hooks
  const {
    data: sessionData,
    isLoading: isSessionLoading,
    refetch: refetchSession,
  } = useGetSessionQuery();
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Derive auth state from session data
  const user = sessionData?.user;
  const isAuthenticated = !!user;

  // Form handling
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    dispatch(setLoading(true));
    try {
      await loginMutation(data).unwrap();
      Alert.alert("Success", "Logged in successfully!");
      reset();
    } catch (error: any) {
      console.error("Login failed:", error);
      Alert.alert("Error", error?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await logoutMutation().unwrap();
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Failed to logout");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert("Coming Soon", `${provider} authentication will be available soon!`);
  };

  const handleRegisterNavigation = () => {
    router.push("/screens/auth/register/register");
  };

  // Show loading screen if session is still loading
  if (isSessionLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Profile</Text>

      {isAuthenticated ? (
        // Authenticated user view - Show profile info
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.email.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.profileName}>Welcome back!</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>

          <View style={styles.profileActions}>
            <TouchableOpacity
              style={styles.button}
              onPress={refetchSession}
              disabled={isSessionLoading}
            >
              <Text style={styles.buttonText}>
                {isSessionLoading ? "Refreshing..." : "Refresh Session"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
              disabled={isLoggingOut}
            >
              <Text style={[styles.buttonText, styles.logoutButtonText]}>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Debug Info */}
          <View style={styles.debugInfo}>
            <Text style={styles.debugTitle}>Debug Info:</Text>
            <Text>User: {user?.email}</Text>
            <Text>Authenticated: Yes</Text>
            <Text>Session Loading: {isSessionLoading ? "Yes" : "No"}</Text>
          </View>
        </View>
      ) : (
        // Unauthenticated user view - Show login/register forms
        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>Sign In to Your Account</Text>

          {/* Login Form */}
          <View style={styles.loginForm}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={handleSubmit(handleLogin)}
              disabled={isLoggingIn || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoggingIn ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login & Register Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.button, styles.socialButton, styles.googleButton]}
              onPress={() => handleSocialLogin("Google")}
            >
              <Text style={[styles.buttonText, styles.socialButtonText]}>
                Sign in with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.socialButton, styles.appleButton]}
              onPress={() => handleSocialLogin("Apple")}
            >
              <Text style={[styles.buttonText, styles.socialButtonText]}>
                Sign in with Apple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={handleRegisterNavigation}
            >
              <Text style={styles.buttonText}>Register with Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },

  // Authenticated user styles
  profileContainer: {
    alignItems: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  profileActions: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  // Unauthenticated user styles
  authContainer: {
    width: "100%",
  },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  loginForm: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: 5,
  },

  // Button styles
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#007bff",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  registerButton: {
    backgroundColor: "#28a745",
  },
  socialButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleButton: {
    borderColor: "#4285f4",
  },
  appleButton: {
    borderColor: "#000",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButtonText: {
    color: "white",
  },
  socialButtonText: {
    color: "#333",
  },

  // Divider styles
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    paddingHorizontal: 15,
    color: "#666",
    fontSize: 14,
  },

  // Social container
  socialContainer: {
    alignItems: "center",
  },

  // Debug info
  debugInfo: {
    padding: 15,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    width: "100%",
  },
  debugTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
});

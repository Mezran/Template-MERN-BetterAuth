import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import Avatar from "./Avatar";

interface WelcomeMessageProps {
  userEmail?: string | null;
  isLoading?: boolean;
}

export default function WelcomeMessage({
  userEmail,
  isLoading = false,
}: WelcomeMessageProps) {
  const handleLoginPress = () => {
    router.push("screens/loginRegister" as any);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userEmail ? (
        // Authenticated user view
        <View style={styles.authenticatedContainer}>
          <Avatar email={userEmail} size={80} />
          <Text style={styles.welcomeText}>Welcome to template app, {userEmail}</Text>
          <Text style={styles.subtitle}>You are successfully logged in!</Text>
        </View>
      ) : (
        // Unauthenticated user view
        <View style={styles.unauthenticatedContainer}>
          <Text style={styles.welcomeText}>Welcome to template app</Text>
          <Text style={styles.subtitle}>Please login or register to continue</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.loginButtonText}>Login / Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  authenticatedContainer: {
    alignItems: "center",
  },
  unauthenticatedContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

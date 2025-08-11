import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser, setLoading, setAuthChecking, logout } from "../store/store";
import { useGetSessionQuery, useLogoutMutation } from "../store/api/authApi";
import WelcomeMessage from "../shared/components/WelcomeMessage";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { user, isLoading, isAuthenticated, isCheckingAuth } = useAppSelector(
    (state) => state.app
  );

  // RTK Query hooks
  const {
    data: sessionData,
    isLoading: isSessionLoading,
    refetch: refetchSession,
  } = useGetSessionQuery();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Check session when app loads
  useEffect(() => {
    if (sessionData) {
      if (sessionData.user) {
        dispatch(setUser(sessionData.user.email));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setAuthChecking(false));
    }
  }, [sessionData, dispatch]);

  // Set initial loading state
  useEffect(() => {
    dispatch(setAuthChecking(isSessionLoading));
  }, [isSessionLoading, dispatch]);

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRefreshSession = () => {
    refetchSession();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <WelcomeMessage userEmail={user} isLoading={isCheckingAuth} />

      {isAuthenticated && (
        <View style={styles.userActions}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRefreshSession}
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
      )}

      {/* Debug Info */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text>User: {user || "Not logged in"}</Text>
        <Text>Authenticated: {isAuthenticated ? "Yes" : "No"}</Text>
        <Text>Checking Auth: {isCheckingAuth ? "Yes" : "No"}</Text>
        <Text>Loading: {isLoading ? "Yes" : "No"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  userActions: {
    marginTop: 20,
    gap: 12,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButtonText: {
    color: "#fff",
  },
  debugInfo: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
});

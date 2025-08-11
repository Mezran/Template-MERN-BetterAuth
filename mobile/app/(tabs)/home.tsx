import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Welcome to Template App</Text>

      <View style={styles.content}>
        <Text style={styles.contentTitle}>Home</Text>
        <Text style={styles.contentText}>
          This is the main home screen of the Template App. Navigate to the Profile tab to
          sign in or manage your account.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    paddingTop: 80,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  contentText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});

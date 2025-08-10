import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AvatarProps {
  email: string;
  size?: number;
}

export default function Avatar({ email, size = 60 }: AvatarProps) {
  const getInitial = (email: string): string => {
    return email.charAt(0).toUpperCase();
  };

  const getBackgroundColor = (email: string): string => {
    // Simple hash function to generate consistent colors
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 70%)`;
  };

  const initial = getInitial(email);
  const backgroundColor = getBackgroundColor(email);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  initial: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

import { Text, View, StyleSheet } from "react-native";

export default function OptionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>
      <Text style={styles.subtitle}>Configure your app settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser, setLoading } from "../store/store";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.app);

  const handleSetUser = () => {
    dispatch(setUser(user ? null : "John Doe"));
  };

  const toggleLoading = () => {
    dispatch(setLoading(!isLoading));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to the Home tab!</Text>

      <View style={styles.reduxDemo}>
        <Text style={styles.demoTitle}>Redux Demo:</Text>
        <Text>User: {user || "Not logged in"}</Text>
        <Text>Loading: {isLoading ? "Yes" : "No"}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSetUser}>
          <Text style={styles.buttonText}>{user ? "Logout" : "Login as John Doe"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleLoading}>
          <Text style={styles.buttonText}>Toggle Loading</Text>
        </TouchableOpacity>
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
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  reduxDemo: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    width: "100%",
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 150,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

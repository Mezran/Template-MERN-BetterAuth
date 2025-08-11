import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/auth/login/login"
          options={{
            title: "Sign In",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="screens/auth/register/register"
          options={{
            title: "Sign Up",
            presentation: "modal",
          }}
        />
      </Stack>
    </Provider>
  );
}

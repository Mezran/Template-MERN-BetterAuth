import { Redirect } from "expo-router";

// Check environment variable to determine what to render
const isStorybookMode = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

// Default app component
function AppIndex() {
  return <Redirect href="/(tabs)/home" />;
}

// Conditionally export based on environment
let ExportedComponent = AppIndex;

if (isStorybookMode) {
  try {
    // Import and use Storybook component
    ExportedComponent = require("../.rnstorybook/index").default;
  } catch (error) {
    console.warn("Failed to load Storybook, falling back to app:", error);
    ExportedComponent = AppIndex;
  }
}

export default ExportedComponent;

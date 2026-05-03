import { initializeDatabase } from "@/database/initializeDatabase";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useColorScheme } from "nativewind";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

const DB_NAME = "database.db";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={initializeDatabase}>
      <RootLayoutNav />
    </SQLiteProvider>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="chat"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#028072" : "#BAC4AD",
            },
            headerTitle: "",

            presentation: "fullScreenModal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="addcontact"
          options={{ presentation: "formSheet" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

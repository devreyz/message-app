import "../styles/global.css";
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="welcome" />
        <Stack.Screen
          name="chat"
          options={{
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
            },
            presentation: "fullScreenModal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="addcontact"
          options={{ 
            presentation: "formSheet",
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

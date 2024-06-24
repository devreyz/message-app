import { getChat } from "@/utils/data/chats";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

export default function ChatLayout() {
  const { id } = useLocalSearchParams();
  const chat = getChat(id);

  return (
    <Stack>
      <Stack.Screen
        name="id/[id]"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}

import { getChat } from "@/utils/data/chats";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatLayout() {
  const { id } = useLocalSearchParams();
  const chat = getChat(id);

  return (
    <SafeAreaView className="flex-1">
    <Slot/>
    </SafeAreaView>
  );
}

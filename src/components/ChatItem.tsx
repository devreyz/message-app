import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";

const unReadCount = (chat) => {
  const unreadNumber = 0;
  chat.unread = chat.messages.filter((msg) => msg.status === "UNREAD").length;
  return chat.unread;
};

export const ChatItem = forwardRef<TouchableOpacity, ChatItemProps>(
  ({ chat, ...props }, ref) => (
    <TouchableOpacity
      ref={ref}
      className="flex-row items-center p-4"
      {...props}
    >
      <Image source={chat.avatar} className="w-12 h-12 rounded-full" />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold mb-2 text-black dark:text-white">{chat.name}</Text>
        <Text className="text-gray-500 dark:text-primarylight">
          <Feather
            name={
              chat.messages[chat.messages.length - 1].isUser
                ? "arrow-up"
                : "arrow-down"
            }
          />
          {chat.messages[chat.messages.length - 1].text}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-gray-400 dark:text-primarylight">
          {chat.messages[chat.messages.length - 1].timestamp.slice(0,10)}
        </Text>
        {unReadCount(chat) > 0 && (
          <View className="bg-primary w-6 h-6 rounded-full items-center justify-center">
            <Text className="text-white text-sm">{chat.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
);

import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";

// const unReadCount = (chat) => {
//   const unreadNumber = 0;
//   chat.unread = chat.messages.filter((msg) => msg.status === "UNREAD").length;
//   return chat.unread;
// };


export const ChatItem = forwardRef<TouchableOpacity, ChatItemProps>(
  ({ chat, ...props }, ref) => (
    <TouchableOpacity
      ref={ref}
      className="flex-row items-center p-4"
      {...props}
    >
      <Image
        source={chat.avatar ?? require("@/assets/images/user.png")}
        className="w-12 h-12 rounded-full"
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold mb-2  text-light-onBackground dark:text-dark-onBackground">
          {chat.name}
        </Text>
        <Text className="text-light-onBackground/70 dark:text-dark-onBackground/70"></Text>
      </View>
      <View className="items-end">
        <Text className="text-light-onBackground/80 dark:text-dark-onBackground/80">
          {/* {chat.messages[chat.messages.length - 1].timestamp.slice(0,10)} */}
        </Text>

        <View className="bg-light-primary dark:bg-dark-primary w-6 h-6 rounded-full items-center justify-center">
          <Text className="text-light-onPrimary dark:text-dark-onPrimary text-sm">
            {chat.unread}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
);

import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getChat } from "@/utils/data/chats";
import { MessageInput } from "@/components/ui/MessageInput";
import { MessageItem } from "@/components/MessageItem";

import { useColorScheme } from "nativewind";

import { useLocalSearchParams, useNavigation } from "expo-router";



const ChatScreen = () => {
    const colors = require('@/constants/colors.json');

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { colorScheme, setColorScheme } = useColorScheme();
  const chat = getChat(id);
  const flatListRef = useRef<FlatList>(null);
  

  type handleScollProps = {
    animated: boolean;
  };

  const handleScrollToEnd = ({ animated }: handleScollProps) => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToEnd({ animated: animated });
    }
  };

  const handleUnreadMessages = () => {
    chat.messages
      .filter(msg => msg.status === "UNREAD" && !msg.isUser)
      .forEach(msg => (msg.status = "READ"));
  };

  useEffect(() => {
    handleScrollToEnd({ animated: false });
    handleUnreadMessages();
  }, []);

  const handleSend = (message: String) => {
    handleScrollToEnd({ animated: true });
    alert(message);
  };
  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      <View className="flex-row items-center justify-between p-4 border-b border-light-surface dark:border-dark-surface gap-4 ">
        <View className="flex-row gap-x-3 items-center ">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left"
              size={32}
              color={colors[colorScheme].textSecondary}
            />
          </TouchableOpacity>
          <Image
            source={chat.avatar}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
              {chat.name}
            </Text>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-light-online dark:bg-dark-online mr-2"></View>
              <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                Online
              </Text>
            </View>
          </View>
        </View>
        <View className="">
          <Feather
            name="more-vertical"
            color={colors[colorScheme].textSecondary}
            size={32}
          />
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={chat.messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={item => item.id}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={{ padding: 16 }}
      />
      <MessageInput onSend={handleSend} />
    </View>
  );
};

export default ChatScreen;

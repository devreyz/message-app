import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  ScrollViewProps,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getChat } from "@/utils/data/chats";
import { MessageInput } from "@/components/MessageInput";
import { MessageItem } from "@/components/MessageItem";

import { useColorScheme } from "nativewind";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChatProps, MessageProps } from "@/types/types";
import { useMessageDatabase } from "@/database/useMessageDatabase";

const newMessage: MessageProps = {
  id: "5",
  text: "Olá, como vai?",
  isUser: true,
  timestamp: new Date().toISOString(),
  status: "SENT",
};

const ChatScreen = () => {
  const colors = require("@/constants/colors.json");
  const messageDB = useMessageDatabase();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
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
      .filter((msg) => msg.status === "UNREAD" && !msg.isUser)
      .forEach((msg) => (msg.status = "READ"));
  };
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
     handleScrollToEnd({ animated: false });
    messageDB.listByContact(id).then((messages) => setMessages(messages));

    handleUnreadMessages();
  }, []);

  const handleSend = (message: string) => {
     handleScrollToEnd({ animated: true });
    messageDB.create({
      contact_id: Number(id),
      isUser: 1,
      status: "PENDING",
      text: message,
      timestamp: String(new Date().getTime()),
    });
    messageDB.listByContact(id).then((messages) => setMessages(messages));
  };
  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      <View className="flex-row items-center justify-between p-2 border-b border-light-surface dark:border-dark-surface gap-4 ">
        <View className="flex-row gap-x-3 items-center ">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left"
              size={32}
              color={colors[colorScheme].textSecondary}
            />
          </TouchableOpacity>
          <Image source={chat.avatar} className="w-12 h-12 rounded-full" />
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
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={(item) => item.id}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        onEndReached={() => console.log("New render End")}
        onEndReachedThreshold={0.5}
        onStartReached={() => console.log("New render Start")}
        windowSize={100}
        
        contentContainerStyle={{ padding: 16 }}
      />
      <MessageInput onSend={handleSend} />
    </View>
  );
};

export default ChatScreen;

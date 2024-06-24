import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  ScrollViewProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { getChat } from "@/utils/data/chats";
import { MessageInput } from "@/components/ui/MessageInput";

import {  useLocalSearchParams, useNavigation } from "expo-router";
import { ChatProps, MessageProps } from "@/types/types";

const newMessage: MessageProps = {
  id: "5",
  text: "Olá, como vai?",
  isUser: true,
  timestamp: new Date().toISOString(),
  status: "SENT",
};

const chatId = "1";


const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const chat = getChat(id);
  const scrollViewRef = useRef<ScrollView>(null);

  type handleScollProps = {
  animated: boolean
  }
  

  const handleScrollToEnd = ({ animated }: handleScollProps) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: animated });
    }
  };

  const handleUnreadMessages = () => {
    chat.messages
      .filter((msg) => msg.status === "UNREAD" && !msg.isUser)
      .forEach((msg) => (msg.status = "READ"));
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
    
      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200 gap-4 ">
          <View className="flex-row items-center ">
            <Text onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={32} color={colors.gray["600"]} />
            </Text>
            <Image source={chat.avatar} className="w-12 h-12 rounded-full" />
            <View className="ml-4">
              <Text className="text-lg font-semibold">{chat.name}</Text>
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-green-500 mr-2"></View>
                <Text className="text-gray-500">Online</Text>
              </View>
            </View>
          </View>
          <View className="">
            <Feather
              name="more-vertical"
              color={colors.gray["600"]}
              size={32}
            />
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {chat.messages.map((message) => (
            <View
              key={message.id}
              className={`flex-row items-start mb-4 ${
                message.isUser ? "justify-end" : ""
              }`}
            >
              <View className="px-1">
                <View
                  className={`max-w-xs p-2 rounded-2xl ${
                    message.isUser
                      ? "bg-chatMessageUser text-white "
                      : "bg-chatMessageNotUser"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      message.isUser ? "text-white" : "text-black"
                    }`}
                  >
                    {message.text}
                  </Text>
                </View>

                <View
                  className={` flex-row mt-1 px-2  ${
                    message.isUser ? "justify-end" : ""
                  }`}
                >
                  <Text className="text-xs text-gray-600 mr-1">
                    {new Date(message.timestamp)
                      .toLocaleTimeString()
                      .slice(0, 5)}
                  </Text>
                  {message.isUser && (
                    <Feather
                      name={
                        message.status === "READ"
                          ? "check-circle"
                          : message.status === "DELIVERED"
                          ? "check-circle"
                          : message.status === "SENT"
                          ? "check"
                          : "clock"
                      }
                      size={14}
                      color={
                        message.status === "READ"
                          ? colors.blue["600"]
                          : message.status === "DELIVERED"
                          ? colors.gray["300"]
                          : message.status === "SENT"
                          ? colors.gray["700"]
                          : colors.gray["700"]
                      }
                    />
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <MessageInput onSend={handleSend} />
      </View>
  );
};

export default ChatScreen;

import React, { useRef } from "react";
import { FlatList, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export const MessageItem = ({ message }) => {
  
  const colors = require("@/constants/colors.json");
   const { colorScheme } = useColorScheme();
 
  return(
  <View
    key={message.id}
    className={`flex-row items-start mb-4 ${
      message.isUser ? "justify-end" : ""
    }`}>
    <View className="px-1">
      <View
        className={`max-w-xs p-2 rounded-2xl ${
          message.isUser
            ? "bg-light-userBg dark:bg-dark-userBg rounded-br-sm"
            : "bg-light-notUserBg dark:bg-dark-notUserBg rounded-bl-sm"
        }`}>
        <Text
          className={`font-semibold ${
            message.isUser
              ? "text-light-userText dark:text-dark-userText"
              : "text-light-notUserText dark:text-dark-notUserText"
          }`}>
          {message.text}
        </Text>
      </View>

      <View
        className={` flex-row mt-1 px-2  ${
          message.isUser ? "justify-end" : ""
        }`}>
        <Text className="text-xs text-light-textSecondary mr-1">
          {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
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
                ? colors[colorScheme].success
                : message.status === "DELIVERED"
                ? colors[colorScheme].textDisabled
                : message.status === "SENT"
                ? colors[colorScheme].textDisabled
                : colors[colorScheme].info
            }
          />
        )}
      </View>
    </View>
  </View>
)}

/*
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 p-4"
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }>
        {chat.messages.map(message => (
          <View
            key={message.id}
            className={`flex-row items-start mb-4 ${
              message.isUser ? "justify-end" : ""
            }`}>
            <View className="px-1">
              <View
                className={`max-w-xs p-2 rounded-2xl ${
                  message.isUser
                    ? "bg-light-userBg dark:bg-dark-userBg"
                    : "bg-light-notUserBg dark:bg-dark-notUserBg"
                }`}>
                <Text
                  className={`font-medium ${
                    message.isUser
                      ? "text-light-userText dark:text-dark-userText"
                      : "text-light-notUserText dark:text-dark-notUserText"
                  }`}>
                  {message.text}
                </Text>
              </View>

              <View
                className={` flex-row mt-1 px-2  ${
                  message.isUser ? "justify-end" : ""
                }`}>
                <Text className="text-xs text-light-textSecondary mr-1">
                  {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
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
*/

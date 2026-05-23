import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { MessageProps } from "@/types/types";

const colors = require("@/constants/colors.json");

type MessageItemProps = {
  message: MessageProps;
};

export const MessageItem = ({ message }: MessageItemProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`flex-row items-start mb-4 ${
        message.is_user ? "justify-end" : ""
      }`}
    >
      <View className="px-1">
        <View
          className={`max-w-xs p-2 rounded-2xl ${
            message.is_user
              ? "bg-light-userBg dark:bg-dark-userBg rounded-br-sm"
              : "bg-light-notUserBg dark:bg-dark-notUserBg rounded-bl-sm"
          }`}
        >
          <Text
            className={`font-semibold ${
              message.is_user
                ? "text-light-userText dark:text-dark-userText"
                : "text-light-notUserText dark:text-dark-notUserText"
            }`}
          >
            {message.text}
          </Text>
        </View>

        <View
          className={`flex-row mt-1 px-2 ${
            message.is_user ? "justify-end" : ""
          }`}
        >
          <Text className="text-xs text-light-textSecondary mr-1">
            {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
          </Text>
          {message.is_user && (
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
                  ? colors[colorScheme ?? "light"].success
                  : message.status === "DELIVERED"
                  ? colors[colorScheme ?? "light"].textDisabled
                  : message.status === "SENT"
                  ? colors[colorScheme ?? "light"].textDisabled
                  : colors[colorScheme ?? "light"].info
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};


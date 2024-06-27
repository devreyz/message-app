import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export const MessageInput = ({ onSend }) => {
  const colors = require("@/constants/colors.json");
  const [message, setMessage] = useState("");
  const { colorScheme } = useColorScheme();
  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View className="flex-row items-end px-4 py-2 bg-light-background dark:bg-dark-background border-t border-t-light-surface dark:border-t-dark-surface">
      <View className="flex-1  bg-light-surface dark:bg-dark-surface rounded-3xl flex-row items-end py-2 px-2">
        <Feather
          name="smile"
          size={32}
          color={colors[colorScheme].textSecondary}
        />
        <TextInput
          className="flex-1 px-2 font-medium text-lg max-h-48 text-light-textPrimary dark:text-dark-textPrimary"
          placeholder="Escreva uma mensagem..."
          value={message}
          editable
          multiline
          placeholderTextColor={colors[colorScheme].textSecondary}
          onChangeText={setMessage}
        />
      </View>
      <TouchableOpacity
        className="ml-2 p-2 bg-light-primary dark:bg-dark-primary rounded-full"
        onPress={handleSend}>
        <Feather
          name="send"
          size={32}
          color={colors[colorScheme].onPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

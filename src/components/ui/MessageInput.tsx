import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View className="flex-row items-end px-4 py-2 bg-light-background dark:bg-dark-background">
      <View className="flex-1  bg-light-surface dark:bg-dark-surface rounded-3xl flex-row items-end py-2 px-2">
        <Feather
          name="smile"
          size={32}
        />
        <TextInput
          className="flex-1 px-2 font-medium text-lg max-h-48 text-light-textPrimary dark:text-dark-textPrimary"
          placeholder="Escreva uma mensagem..."
          value={message}
          editable
          multiline
          placeholderTextColor={"#ffffff"}
          onChangeText={setMessage}
        />
      </View>
      <TouchableOpacity
        className="ml-2 p-2 bg-light-primary dark:bg-dark-primary rounded-full"
        onPress={handleSend}>
        <Feather
          name="send"
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

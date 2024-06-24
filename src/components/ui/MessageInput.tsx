import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View className="flex-row items-end px-4 py-2 bg-gray-100">
      <View className="flex-1  bg-gray-300 rounded-3xl text-gray-900 flex-row items-end py-2 px-2">
        <Feather name="smile" size={32} />
        <TextInput
          className="flex-1 px-2 font-medium text-lg max-h-48"
          placeholder="Escreva uma mensagem..."
          value={message}
          editable
          multiline
          onChangeText={setMessage}
        />
      </View>
      <TouchableOpacity
        className="ml-2 p-2 bg-primary rounded-full"
        onPress={handleSend}
      >
        <Feather name="send" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

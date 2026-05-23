import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MessageInput } from "@/components/MessageInput";
import { MessageItem } from "@/components/MessageItem";
import { useColorScheme } from "nativewind";
import { useNavigation } from "expo-router";
import { useChat } from "@/hooks/useChat";

const colors = require("@/constants/colors.json");

const ChatScreen = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { messages, contact, flatListRef, sendMessage } = useChat();

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      {/* Cabeçalho da tela de chat */}
      <View className="flex-row items-center justify-between p-2 border-b border-light-surface dark:border-dark-surface gap-4">
        <View className="flex-row gap-x-3 items-center">
          {/* Botão para voltar */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left"
              size={32}
              color={colors[colorScheme ?? "light"].textSecondary}
            />
          </TouchableOpacity>

          {/* Imagem do usuário */}
          <Image
            source={require("@/assets/images/user.png")}
            className="w-12 h-12 rounded-full"
          />

          <View className="ml-4">
            <Text className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
              {contact?.name ?? "..."}
            </Text>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-light-online dark:bg-dark-online mr-2" />
              <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                Online
              </Text>
            </View>
          </View>
        </View>

        {/* Botão de mais opções */}
        <Feather
          name="more-vertical"
          color={colors[colorScheme ?? "light"].textSecondary}
          size={32}
        />
      </View>

      {/* Lista de mensagens */}
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
        onEndReachedThreshold={0.5}
        windowSize={100}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Componente de input de mensagem */}
      <MessageInput onSend={sendMessage} />
    </View>
  );
};

export default ChatScreen;

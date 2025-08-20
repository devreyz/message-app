import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MessageInput } from "@/components/MessageInput";
import { MessageItem } from "@/components/MessageItem";
import { useColorScheme } from "nativewind";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChatProps, MessageProps } from "@/types/types";
import { useMessageDatabase } from "@/database/useMessageDatabase";

// Componente da tela de chat
const ChatScreen = () => {
  // Importa cores de um arquivo JSON
  const colors = require("@/constants/colors.json");

  // Obtém funções do banco de dados de mensagens
  const messageDB = useMessageDatabase();

  // Obtém parâmetros locais da URL
  const { id } = useLocalSearchParams();

  // Obtém funções de navegação
  const navigation = useNavigation();

  // Obtém o esquema de cores (claro ou escuro)
  const { colorScheme } = useColorScheme();

  // Referência para a FlatList
  const flatListRef = useRef<FlatList>(null);

  // Definição das propriedades para a função de rolar até o fim da lista
  type handleScollProps = {
    animated: boolean;
  };

  // Função para rolar até o fim da lista
  const handleScrollToEnd = ({ animated }: handleScollProps) => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToEnd({ animated: animated });
    }
  };

  // Estado para armazenar as mensagens
  const [messages, setMessages] = useState<MessageProps[]>([]);

  // UseEffect para carregar as mensagens quando o componente é montado
  useEffect(() => {
    handleScrollToEnd({ animated: false });
    messageDB.listByContact(Number(id)).then((messages) => setMessages(messages));
  }, []);

  // Função para enviar uma mensagem
  const handleSend = (message: string) => {
    handleScrollToEnd({ animated: true });
    messageDB.create({
      contact_id: Number(id),
      isUser: 1,
      status: "PENDING",
      text: message,
      timestamp: String(new Date().getTime()),
    });
    messageDB.listByContact(Number(id)).then((messages) => setMessages(messages));
  };

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      {/* Cabeçalho da tela de chat */}
      <View className="flex-row items-center justify-between p-2 border-b border-light-surface dark:border-dark-surface gap-4 ">
        <View className="flex-row gap-x-3 items-center ">
          {/* Botão para voltar */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left"
              size={32}
              color={colors[colorScheme].textSecondary}
            />
          </TouchableOpacity>
          {/* Imagem do usuário */}
          <Image
            source={require("@/assets/images/user.png")}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
              {/* Nome do usuário */}
              Username
            </Text>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-light-online dark:bg-dark-online mr-2"></View>
              <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                Online
              </Text>
            </View>
          </View>
        </View>
        {/* Botão de mais opções */}
        <View className="">
          <Feather
            name="more-vertical"
            color={colors[colorScheme].textSecondary}
            size={32}
          />
        </View>
      </View>

      {/* Lista de mensagens */}
      {messages && (
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
      )}

      {/* Componente de input de mensagem */}
      <MessageInput onSend={handleSend} />
    </View>
  );
};

export default ChatScreen;

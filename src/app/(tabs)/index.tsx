import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";

// Importação de ícones do Expo
import { Feather } from "@expo/vector-icons";

// Importação de navegação e hooks do Expo Router
import { Link, router } from "expo-router";

// Importação de hooks e funções do React
import { useCallback, useEffect, useState } from "react";

import { ChatItem } from "@/components/ChatItem";

// Importação de funções do banco de dados de contatos
import {
  ContactDatabaseProps,
  useContactDatabase,
} from "@/database/useContactDatabase";

export default function Home() {
  // Recupera a função listAll do hook useContactDatabase
  const { listAll } = useContactDatabase();

  // Estado para armazenar a lista de contatos
  const [contacts, setContacts] = useState<ContactDatabaseProps[]>([]);

  // Estado para controlar a atualização da lista
  const [refreshing, setRefreshing] = useState(false);

  // Função para atualizar a lista de contatos ao puxar para baixo
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllContacts();
  }, []);

  // Função assíncrona para obter todos os contatos do banco de dados
  async function getAllContacts() {
    try {
      const data = await listAll();
      setContacts(data ?? []);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os contatos");
    }
    setRefreshing(false);
  }

  // UseEffect para carregar os contatos quando o componente é montado
  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 bg-light-background dark:bg-dark-background relative">
        {/* FlatList para renderizar a lista de contatos */}
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <Link href={`/chat/id/${item.id}`} asChild>
              <ChatItem chat={item} />
            </Link>
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        {/* Botão flutuante para adicionar novo contato */}
        <TouchableOpacity
          className="bg-light-primary dark:bg-dark-primary w-14 h-14 rounded-full flex flex-row items-center justify-center absolute bottom-6 right-6"
          onPress={() => router.navigate("addcontact")}
        >
          <Feather size={24} name="plus" color={"#000000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

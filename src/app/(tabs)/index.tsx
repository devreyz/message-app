import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ChatItem } from "@/components/ChatItem";
import {
  ContactDatabaseProps,
  useContactDatabase,
} from "@/database/useContactDatabase";

export default function Home() {
  const { listAll } = useContactDatabase();
  const [contacts, setContacts] = useState<ContactDatabaseProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllContacts();
  }, []);

  async function getAllContacts() {
    try {
      const data = await listAll();
      setContacts(data ?? []);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os contatos");
    }
    setRefreshing(false);
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 bg-light-background dark:bg-dark-background relative">
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <Link href={`/chat/id/${item.id}`} asChild>
              <ChatItem chat={item} />
            </Link>
          )}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

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

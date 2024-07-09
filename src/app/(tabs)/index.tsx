import { CHATS, ChatProps } from "@/utils/data/chats";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { forwardRef, useEffect, useState } from "react";

import { ChatItem } from "@/components/ChatItem";
import {
  ContactDatabaseProps,
  useContactDatabase,
} from "@/database/useContactDatabase";

type ChatItemProps = TouchableOpacityProps & {
  chat: ChatProps;
};

export default function Home() {
  const { listAll } = useContactDatabase();
  const [contacts, setContacts] = useState<ContactDatabaseProps[]>([]);
  async function getAllContacts() {
    try {
      listAll().then((data) => {
        
        setContacts(data ?? []);
      });
    } catch (error) {}
  }
  useEffect(() => {
    getAllContacts()
  }, []);
  useEffect(() => {
    console.log(contacts[0]?.avatar);
    
  }, [contacts])
  return (
    <View className="flex-1">
      <View></View>
      <View className="flex-1 bg-light-background dark:bg-dark-background relative">
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <Link href={`/chat/id/${item.id}`} asChild>
              <ChatItem chat={item} />
            </Link>
          )}
          keyExtractor={(item) => item.id}
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

import { CHATS, ChatProps } from "@/utils/data/chats";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link, router } from "expo-router";
import { forwardRef } from "react";

import { ChatItem } from "@/components/ChatItem";

type ChatItemProps = TouchableOpacityProps & {
  chat: ChatProps;
};


export default function Home() {

  
  return (
    <View className="flex-1">
      <View className="flex-1 bg-white dark:bg-black relative">
        <FlatList
          data={CHATS}
          renderItem={({ item }) => (
            <Link href={`/chat/id/${item.id}`} asChild>
              <ChatItem chat={item} />
            </Link>
          )}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          
          className="bg-primary w-14 h-14 rounded-full flex flex-row items-center justify-center absolute bottom-6 right-6"
          onPress={() => router.navigate("addcontact")}
        >
          <Feather size={24} name="plus" color={"#ffffff"}/> 
        </TouchableOpacity>
      </View>
    </View>
  );
}


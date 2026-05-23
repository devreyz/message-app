import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MessageProps } from "@/types/types";
import {
  ContactDatabaseProps,
  useContactDatabase,
  useMessageDatabase,
} from "@/database";

export function useChat() {
  const { id } = useLocalSearchParams();
  const contactId = Number(id);

  const messageDB = useMessageDatabase();
  const contactDB = useContactDatabase();

  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [contact, setContact] = useState<ContactDatabaseProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToEnd = (animated = true) => {
    flatListRef.current?.scrollToEnd({ animated });
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [msgs, c] = await Promise.all([
        messageDB.listByContact(contactId),
        contactDB.getById(contactId),
        contactDB.markAsRead(contactId),
      ]);
      setMessages(msgs);
      setContact(c ?? null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    scrollToEnd(true);
    await messageDB.create({
      contact_id: contactId,
      is_user: 1,
      status: "PENDING",
      text,
      timestamp: String(new Date().getTime()),
    });
    const msgs = await messageDB.listByContact(contactId);
    setMessages(msgs);
  };

  useEffect(() => {
    scrollToEnd(false);
    loadData();
  }, []);

  return {
    messages,
    contact,
    isLoading,
    flatListRef,
    scrollToEnd,
    sendMessage,
  };
}

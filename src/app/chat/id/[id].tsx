import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground, Text, useWindowDimensions } from "react-native";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { MessageInput } from "@/components/MessageInput";
import { MessageItem } from "@/components/MessageItem";
import { useColorScheme } from "nativewind";
import { useLocalSearchParams } from "expo-router";
import { MessageProps } from "@/types/types";
import { useMessageDatabase } from "@/database/useMessageDatabase";
import { useContactDatabase, ContactDatabaseProps } from "@/database/useContactDatabase";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatScreen = () => {
  const messageDB = useMessageDatabase();
  const contactDB = useContactDatabase();
  const { id } = useLocalSearchParams();
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [contact, setContact] = useState<ContactDatabaseProps | null>(null);

  // Aumento agressivo do offset para garantir que o teclado não cubra nada
  const getKeyboardOffset = () => {
    if (Platform.OS !== 'ios') return 0;
    // Baseado na altura do cabeçalho customizado + safe area
    return 0; 
  };

  const handleScrollToEnd = (animated = true) => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  const loadData = async () => {
    const contactData = await contactDB.findById(Number(id));
    setContact(contactData || null);
    const messagesData = await messageDB.listByContact(Number(id));
    setMessages(messagesData);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSend = async (message: string) => {
    await messageDB.create({
      contact_id: Number(id),
      is_user: 1,
      status: "SENT",
      text: message,
      timestamp: String(new Date().getTime()),
    });
    loadData();
    handleScrollToEnd();
  };

  const bgColor = isDark ? '#000' : '#E5DDD5';
  const boxBg = isDark ? '#1C1C1E' : '#FFF';
  const borderColor = isDark ? '#333' : '#EEE';

  const EncryptionNotice = () => (
    <View style={styles.encryptionContainer}>
       <View style={[styles.encryptionBox, { backgroundColor: boxBg, borderColor: borderColor }]}>
          <Text style={styles.encryptionText}>
            <Feather name="lock" size={12} color="#D4AF37" /> As mensagens e ligações são protegidas com a criptografia de ponta a ponta. Somente as pessoas que fazem parte da conversa podem ler, ouvir e compartilhar esse conteúdo. <Text style={{ color: '#D4AF37' }}>Saiba mais</Text>
          </Text>
       </View>
       <View style={[styles.dateHeader, { backgroundColor: boxBg }]}>
          <Text style={styles.dateText}>Hoje</Text>
       </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#E5DDD5' }]}>
      <WhatsAppHeader 
        title={contact?.name || "Carregando..."} 
        avatar={contact?.avatar} 
        isChat={true} 
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={getKeyboardOffset()}
      >
        <ImageBackground 
          source={require("@/assets/images/chat_bg.png")} 
          style={styles.bg}
          imageStyle={{ opacity: isDark ? 0.15 : 0.05 }}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            ListHeaderComponent={EncryptionNotice}
            renderItem={({ item }) => <MessageItem message={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16, paddingBottom: 10 }}
            onContentSizeChange={() => handleScrollToEnd()}
          />
        </ImageBackground>
        
        {/* Agora o input está fora do fundo, garantindo que o teclado o empurre corretamente */}
        <MessageInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1 },
  encryptionContainer: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  encryptionBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 0.5,
    marginBottom: 20,
  },
  encryptionText: {
    color: '#D4AF37',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  dateHeader: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  }
});

export default ChatScreen;

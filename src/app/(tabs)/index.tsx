import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { useCallback, useEffect, useState } from "react";
import { ChatItem } from "@/components/ChatItem";
import { useRouter } from "expo-router";
import {
  ContactDatabaseProps,
  useContactDatabase,
} from "@/database/useContactDatabase";
import { useColorScheme } from "nativewind";

const FILTERS = ["Todas", "Não lidas"];

export default function Home() {
  const { listAll } = useContactDatabase();
  const [contacts, setContacts] = useState<ContactDatabaseProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todas");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

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

  const bgColor = isDark ? '#000' : '#FFF';
  const filterBg = isDark ? '#1A1A1A' : '#F5F5F5';
  const textColor = isDark ? '#FFF' : '#000';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <WhatsAppHeader title="NexTalk" />

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filtersScroll}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                { backgroundColor: filterBg },
                activeFilter === filter && styles.filterActive
              ]}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && { color: '#D4AF37' }
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ChatItem 
            chat={item} 
            onPress={() => router.push(`/chat/id/${item.id}`)} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#D4AF37" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filtersContainer: {
    paddingVertical: 12,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  filterText: {
    color: '#888',
    fontWeight: '600',
  }
});

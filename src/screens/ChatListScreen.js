import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const conversations = [
  { id: '1', name: 'João' },
  { id: '2', name: 'Maria' },
  { id: '3', name: 'Carlos' },
];

export default function ChatListScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Conversas</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 bg-white mb-2 rounded shadow"
            onPress={() => navigation.navigate('Chat', { userName: item.name })}
          >
            <Text className="text-lg">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

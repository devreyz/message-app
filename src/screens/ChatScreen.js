import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatScreen({ route }) {
  const { userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if(text.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text, sender: 'me' }]);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-100"
    >
      <Text className="text-2xl font-bold p-4">{userName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`p-2 m-2 rounded ${item.sender === 'me' ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start'}`}>
            <Text className={`${item.sender === 'me' ? 'text-white' : 'text-black'}`}>{item.text}</Text>
          </View>
        )}
      />
      <View className="flex-row p-4 border-t border-gray-300">
        <TextInput
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
          placeholder="Digite uma mensagem..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

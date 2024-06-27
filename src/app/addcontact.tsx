import ContactForm from '@/components/ContactForm';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView,ScrollView } from 'react-native';

import { Text, View } from 'react-native';

export default function AddContactScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold mb-4 text-black dark:text-white">Novo Contato</Text>
        <ContactForm />
      </ScrollView>
    </SafeAreaView>
  );
}
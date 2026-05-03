import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if(email && password){
      // Aqui você vai salvar no SQLite ou backend
      Alert.alert('Sucesso', 'Conta criada!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Registrar</Text>
      <TextInput
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Criar conta" onPress={handleRegister} />
      <Text className="mt-4 text-blue-500" onPress={() => navigation.navigate('Login')}>
        Voltar ao login
      </Text>
    </View>
  );
}

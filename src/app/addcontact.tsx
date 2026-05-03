import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { useContactDatabase } from "@/database/useContactDatabase";

export default function AddContactScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { create } = useContactDatabase();
  const router = useRouter();

  async function handleAdd() {
    if (!name || !phone) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }

    try {
      await create({ name, phone: Number(phone) });
      Alert.alert("Sucesso", "Contato adicionado!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o contato");
    }
  }

  return (
    <View style={styles.container}>
      <WhatsAppHeader title="Novo Contato" />
      
      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>NOME DO CONTATO</Text>
          <TextInput
            placeholder="Ex: João Silva"
            placeholderTextColor="#444"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>TELEFONE</Text>
          <TextInput
            placeholder="(00) 00000-0000"
            placeholderTextColor="#444"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>SALVAR CONTATO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: {
    padding: 20,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#111',
    color: '#FFF',
    padding: 18,
    borderRadius: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  }
});
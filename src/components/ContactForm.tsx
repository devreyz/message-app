import { useContactDatabase } from "@/database/useContactDatabase";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const ContactForm = () => {
  const contactDB = useContactDatabase();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const createContact = async () => {
    try {
      if (isNaN(Number(phone)) || phone.trim() === "") {
        return Alert.alert("Telefone inválido", `"${phone}" não é um número válido.`);
      }

      const response = await contactDB.create({ name, phone: Number(phone) });
      Alert.alert("Sucesso", "Contato cadastrado com o id: " + response.insertedRowId);
      setName("");
      setPhone("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o contato. Tente novamente.");
    }
  };

  return (
    <View className="p-4">
      <View className="mb-4">
        <Text className="text-lg mb-2 text-light-textPrimary dark:text-dark-textPrimary">
          Nome
        </Text>
        <TextInput
          className="border-b border-primary py-1 px-2 text-light-textPrimary dark:text-dark-textPrimary"
          value={name}
          onChangeText={setName}
          placeholder="Nome do contato"
          autoCapitalize="words"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-light-textPrimary dark:text-dark-textPrimary">
          Número
        </Text>
        <TextInput
          className="border-b border-primary py-1 px-2 text-light-textPrimary dark:text-dark-textPrimary"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Número de telefone"
        />
      </View>
      <Button title="Salvar" onPress={createContact} />
    </View>
  );
};

export default ContactForm;

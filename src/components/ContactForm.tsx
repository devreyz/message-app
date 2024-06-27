import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Contact Submitted",
      `Name: ${name}, Email: ${email}, Phone: ${phone}`
    );
  };

  return (
    <View className="p-4 ">
      <View className="mb-4 flex">
        <Text className="text-lg mb-2">Nome</Text>
        <TextInput
          className="border-b border-primary py-1 px-2 "
          value={name}
          onChangeText={setName}
        />
      </View>
     
      <View className="mb-4">
        <Text className="text-lg mb-2">Numero</Text>
        <TextInput
            className="border-b border-primary py-1 px-2 "
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ContactForm;

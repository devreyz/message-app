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
    <View className="p-4 rounded-lg ">
      <View className="mb-4">
        <Text className="text-lg mb-2">Name</Text>
        <TextInput
          className="border border-primary py-2 px-4 rounded-full"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg mb-2">Email</Text>
        <TextInput
          className="border border-primary py-2 px-4 rounded-full"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg mb-2">Phone</Text>
        <TextInput
          className="border border-primary py-2 px-4 rounded-full"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ContactForm;

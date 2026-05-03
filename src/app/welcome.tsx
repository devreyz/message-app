import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSettingsDatabase } from "@/database/useSettingsDatabase";
import { Feather } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { updateProfile } = useSettingsDatabase();
  const router = useRouter();

  async function handleFinish() {
    if (!name || !phone) return;
    await updateProfile(name, phone);
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-8 pt-6 pb-12 justify-between">
            <View>
              {/* Back Button */}
              <TouchableOpacity onPress={() => router.back()} className="mb-6 -ml-2">
                <Feather name="chevron-left" size={36} color="#D4AF37" />
              </TouchableOpacity>

              <View className="w-20 h-20 bg-[#D4AF37] rounded-3xl items-center justify-center mb-8 shadow-2xl shadow-[#D4AF37]/50">
                <Feather name="message-square" size={40} color="black" />
              </View>
              
              <Text className="text-white text-5xl font-bold mb-2">Bem-vindo</Text>
              <Text className="text-[#D4AF37] text-xl font-medium mb-12">
                Configure seu perfil premium
              </Text>
  
              <View className="space-y-6">
                <View>
                  <Text className="text-[#D4AF37] text-xs font-bold uppercase mb-2 ml-1">Nome Completo</Text>
                  <View className="bg-[#1A1A1A] rounded-2xl px-5 py-4 border border-[#D4AF37]/20">
                    <TextInput
                      placeholder="Como devemos te chamar?"
                      placeholderTextColor="#4A4A4A"
                      className="text-white text-lg"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>
  
                <View className="mt-6">
                  <Text className="text-[#D4AF37] text-xs font-bold uppercase mb-2 ml-1">Telefone</Text>
                  <View className="bg-[#1A1A1A] rounded-2xl px-5 py-4 border border-[#D4AF37]/20 flex-row items-center">
                     <Text className="text-white text-lg mr-2">+55</Text>
                     <TextInput
                      placeholder="(00) 00000-0000"
                      placeholderTextColor="#4A4A4A"
                      className="text-white text-lg flex-1"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                </View>
              </View>
            </View>
  
            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-[#D4AF37] py-5 rounded-2xl items-center shadow-2xl shadow-[#D4AF37]/30"
              onPress={handleFinish}
            >
              <Text className="text-black font-bold text-xl uppercase tracking-widest">Começar Agora</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

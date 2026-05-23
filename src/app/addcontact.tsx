import ContactForm from "@/components/ContactForm";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, ScrollView, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function AddContactScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold mb-4 text-black dark:text-white">{t("new_contact")}</Text>
        <ContactForm />
      </ScrollView>
    </SafeAreaView>
  );
}
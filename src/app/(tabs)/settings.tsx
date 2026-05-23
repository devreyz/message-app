import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { languageNames } from "@/i18n/translations";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";

const colors = require("@/constants/colors.json");

export default function TabTwoScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setModalVisible(false);
  };

  return (
    <View className="flex-1">
      <Text className="font-semibold text-2xl mb-10 px-4 py-3 text-light-textPrimary dark:text-dark-textPrimary">{t("settings_title")}</Text>
      <TouchableOpacity
        className="dark:text-white flex-row justify-between py-2 px-4 border-y border-y-light-onSurface/10 dark:border-y-dark-onSurface/10"
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        <Text className="text-lg text-light-textPrimary dark:text-dark-textPrimary">
          {t("settings_toggle_theme")}
        </Text>
        <Feather
          name={`${colorScheme === "light" ? "moon" : "sun"}`}
          size={24}
          color={`${colors[colorScheme ?? "light"].textPrimary}`}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="dark:text-white flex-row justify-between py-2 px-4 border-b border-b-light-onSurface/10 dark:border-b-dark-onSurface/10"
        onPress={() => setModalVisible(true)}
      >
        <View>
          <Text className="text-lg text-light-textPrimary dark:text-dark-textPrimary">
            {t("settings_language")}
          </Text>
          <Text className="text-sm text-light-textDisabled dark:text-dark-textDisabled mt-1">
            {languageNames[i18n.language as keyof typeof languageNames] || languageNames["pt"]}
          </Text>
        </View>
        <Feather
          name="globe"
          size={24}
          color={`${colors[colorScheme ?? "light"].textPrimary}`}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-light-background dark:bg-dark-background h-2/3 rounded-t-2xl p-4">
            <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-b-light-onSurface/10 dark:border-b-dark-onSurface/10">
              <Text className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                {t("settings_language_select")}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={colors[colorScheme ?? "light"].textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {Object.entries(languageNames).map(([code, name]) => (
                <TouchableOpacity
                  key={code}
                  className="py-3 px-2 flex-row justify-between items-center border-b border-b-light-onSurface/5 dark:border-b-dark-onSurface/5"
                  onPress={() => changeLanguage(code)}
                >
                  <Text className="text-lg text-light-textPrimary dark:text-dark-textPrimary">
                    {name}
                  </Text>
                  {i18n.language === code && (
                    <Feather name="check" size={20} color={colors[colorScheme ?? "light"].primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

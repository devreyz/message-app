import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { resources } from "./translations";

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetectorPlugin = {
  type: "languageDetector" as const,
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      // Obter o idioma salvo no AsyncStorage
      const savedDataJSON = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      const lng = savedDataJSON ? savedDataJSON : null;
      const selectLanguage = lng || Localization.getLocales()[0].languageCode || "pt";
      callback(selectLanguage);
    } catch (error) {
      console.log("Erro lendo o idioma", error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      // Salvar o idioma selecionado no AsyncStorage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log("Erro salvando o idioma", error);
    }
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false, // react já faz o escape por padrão
    },
  });

export default i18n;

import { useSQLiteContext } from "expo-sqlite";

export type SettingsProps = {
  id: number;
  user_name: string | null;
  user_phone: string | null;
  theme: string;
};

export function useSettingsDatabase() {
  const database = useSQLiteContext();

  async function getSettings() {
    try {
      const query = "SELECT * FROM settings WHERE id = 1";
      const response = await database.getFirstAsync<SettingsProps>(query);
      return response;
    } catch (error) {
      console.error("Erro ao buscar configurações:", error);
      return null;
    }
  }

  async function updateProfile(name: string, phone: string) {
    try {
      await database.runAsync(
        "UPDATE settings SET user_name = ?, user_phone = ? WHERE id = 1",
        [name, phone]
      );
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  }

  async function updateTheme(theme: string) {
    try {
      await database.runAsync(
        "UPDATE settings SET theme = ? WHERE id = 1",
        [theme]
      );
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
      throw error;
    }
  }

  return { getSettings, updateProfile, updateTheme };
}

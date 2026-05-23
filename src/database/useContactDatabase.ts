import { useSQLiteContext } from "expo-sqlite";

export type ContactDatabaseProps = {
  id: number;
  name: string;
  phone: number;
  avatar: string;
  unread: number;
};

export function useContactDatabase() {
  const database = useSQLiteContext();

  async function create(
    data: Omit<ContactDatabaseProps, "id" | "avatar" | "unread">
  ) {
    const statement = await database.prepareAsync(
      "INSERT INTO contacts (name, phone) VALUES ($name, $phone)"
    );
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $phone: data.phone,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return {
        insertedRowId,
      };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function listAll() {
    const query = "SELECT * FROM contacts";
    return database.getAllAsync<ContactDatabaseProps>(query);
  }

  async function getById(id: number) {
    try {
      const query = "SELECT * FROM contacts WHERE id = ?";
      const response = await database.getFirstAsync<ContactDatabaseProps>(
        query,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function markAsRead(id: number) {
    const statement = await database.prepareAsync(
      "UPDATE contacts SET unread = 0 WHERE id = $id"
    );
    try {
      await statement.executeAsync({ $id: id });
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function listByName(name: string) {
    try {
      const query = "SELECT * FROM contacts WHERE name LIKE ?";
      const response = await database.getAllAsync<ContactDatabaseProps>(
        query,
        `%${name}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    listAll,
    getById,
    markAsRead,
    listByName,
  };
}

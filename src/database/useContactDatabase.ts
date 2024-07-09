import { useSQLiteContext } from "expo-sqlite";

export type ContactDatabaseProps = {
  id: string;
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
      
    }
  }

  async function listAll() {
    try {
      const query = "SELECT * FROM  contacts";
      const response = await database.getAllAsync<ContactDatabaseProps>(query);

      return response;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  async function listByName(name: string) {
    try {
      const query = "SELECT * FROM  contacts WHERE name LIKE ?";
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
    listByName,
  };
}

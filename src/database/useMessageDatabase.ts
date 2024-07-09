// useMessageDatabase.ts
import { useSQLiteContext } from "expo-sqlite";

export type MessageDatabaseProps = {
  id: string;
  contact_id: number;
  text: string;
  isUser: number;
  timestamp: string;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "UNREAD";
};

export function useMessageDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<MessageDatabaseProps, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO messages (id, contact_id, text, is_user, timestamp, status) VALUES ($id, $contact_id, $text, $isUser, $timestamp, $status)"
    );
    try {
      await statement.executeAsync({
        
        $contact_id: data.contact_id,
        $text: data.text,
        $isUser: data.isUser,
        $timestamp: data.timestamp,
        $status: data.status,
      });
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  async function listAll() {
    try {
      const query = "SELECT * FROM messages";
      const response = await database.getAllAsync<MessageDatabaseProps>(query);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function listByContact(contact_id: number) {
    try {
      const query = "SELECT * FROM messages WHERE contact_id = ?";
      const response = await database.getAllAsync<MessageDatabaseProps>(
        query,
        contact_id
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function remove(id: string) {
    const statement = await database.prepareAsync(
      "DELETE FROM messages WHERE id = $id"
    );
    try {
      await statement.executeAsync({ $id: id });
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  async function updateStatus(id: string, status: string) {
    const statement = await database.prepareAsync(
      "UPDATE messages SET status = $status WHERE id = $id"
    );
    try {
      await statement.executeAsync({ $status: status, $id: id });
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  return {
    create,
    listAll,
    listByContact,
    remove,
    updateStatus,
  };
}

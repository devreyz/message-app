import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { chatScheme } from "./ChatSchemas";

export const messageScheme = sqliteTable("messages", {
  id: text("id").primaryKey(),
  chat_id: text("chat_id")
    .references(() => chatScheme.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  message: text("message").notNull(),
});

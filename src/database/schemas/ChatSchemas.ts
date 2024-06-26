import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chatScheme = sqliteTable("chats", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar").default("user.png"),
  unread: integer("unread").default(0),
});

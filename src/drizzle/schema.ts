import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('finances', {
  id: int().primaryKey({ autoIncrement: true }),
  priceInCents: int().notNull(),
  type: text().notNull(),
  createdAt: text().notNull(),
  expirationDate: text(),
});

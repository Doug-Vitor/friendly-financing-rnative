import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const financesTable = sqliteTable('finances', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().default(''),
  priceInCents: int().notNull().default(0),
  type: text().notNull(),
  createdAt: int().notNull(),
  expirationDay: int(),
});

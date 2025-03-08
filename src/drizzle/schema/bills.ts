import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export default sqliteTable('bills', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().default(''),
  priceInCents: int().notNull().default(0),
  createdAt: int().notNull(),
  expirationDay: int().notNull(),
});

import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import bills from './bills';

export default sqliteTable('incomes', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().default(''),
  priceInCents: int().notNull().default(0),
  type: text().notNull(),
  createdAt: int().notNull(),
  billId: int().references(() => bills.id),
});

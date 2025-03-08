import { eq, sum } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/drizzle';
import migrations from '@/drizzle/migrations/migrations';
import { tables } from '@/drizzle/schema';
import { Persister } from '@/types/Persister';

migrate(db, migrations).catch(console.error);

const byId = (table: any, id: number) => eq(table.id, id);
export function useLocalPersister(): Persister {
  return {
    async create(table: keyof typeof tables, obj: any): Promise<any> {
      return (
        await db
          .insert(tables[table])
          .values({ ...obj, createdAt: +new Date() })
          .returning()
      )[0];
    },
    async get(table: keyof typeof tables, filters = []): Promise<any> {
      const fromTable = tables[table];
      let query = db.select().from(fromTable);
      let dashboardQuery = db.select({ value: sum(fromTable.priceInCents) }).from(fromTable);

      [query, dashboardQuery].forEach((query) =>
        filters.forEach((filter) => (query = query.where(filter)))
      );

      return {
        data: await query,
        dashboard: {
          debit: (await dashboardQuery.where(eq(fromTable.type, 'debit')))[0].value,
          credit: (await dashboardQuery.where(eq(fromTable.type, 'credit')))[0].value,
        },
      };
    },
    async getById(table: keyof typeof tables, id: number): Promise<any> {
      const fromTable = tables[table];
      return (await db.select().from(fromTable).where(byId(fromTable, id)))[0];
    },
    async update(table: keyof typeof tables, obj: any): Promise<any> {
      delete obj.createdAt;

      const fromTable = tables[table];
      return await db.update(fromTable).set(obj).where(byId(fromTable, obj.id)).returning();
    },
    async destroy(table: keyof typeof tables, id: any): Promise<any> {
      const fromTable = tables[table];
      return await db.delete(fromTable).where(byId(fromTable, id));
    },
  };
}

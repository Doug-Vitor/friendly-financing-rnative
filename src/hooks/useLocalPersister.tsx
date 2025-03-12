import { desc, eq, gte, lte, sum } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/drizzle';
import migrations from '@/drizzle/migrations/migrations';
import { tables } from '@/drizzle/schema';
import { Persister } from '@/types/Persister';

migrate(db, migrations).catch(console.error);

const byId = (table: any, id: number) => eq(table.id, id);
const applyFilters = (query, table, filters) => {
  if (filters?.createdAt?.from) query = query.where(gte(table.createdAt, filters.createdAt.from));
  if (filters?.createdAt?.to) query = query.where(lte(table.createdAt, filters.createdAt.to));
  if (filters?.type?.eq) query = query.where(eq(table.type, filters.type?.eq));

  return query;
};

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
    async get(table: keyof typeof tables, filters = {}): Promise<any> {
      const fromTable = tables[table];
      const query = db.select().from(fromTable);
      const dashboardQuery = db.select({ value: sum(fromTable.priceInCents) }).from(fromTable);

      return {
        data: await applyFilters(query, fromTable, filters).orderBy(desc(fromTable.createdAt)),
        dashboard: {
          debit: (
            await applyFilters(dashboardQuery, fromTable, { type: { eq: 'debit' }, ...filters })
          )[0].value,
          credit: (
            await applyFilters(dashboardQuery, fromTable, { type: { eq: 'credit' }, ...filters })
          )[0].value,
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

import { eq } from 'drizzle-orm';
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
    async get(table: keyof typeof tables, id?: number): Promise<any> {
      const fromTable = tables[table];
      const query = db.select().from(fromTable);

      if (id) return (await query.where(byId(fromTable, id)))[0];
      return await query;
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

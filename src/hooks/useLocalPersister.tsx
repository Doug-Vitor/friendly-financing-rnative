import { eq } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/drizzle';
import migrations from '@/drizzle/migrations/migrations';
import { financesTable } from '@/drizzle/schema';
import { Persister } from '@/types/Persister';

migrate(db, migrations).catch(console.error);

const byId = (id: number) => eq(financesTable.id, id);
export function useLocalPersister(): Persister {
  return {
    async create(obj: any): Promise<any> {
      return (
        await db
          .insert(financesTable)
          .values({ ...obj, createdAt: +new Date() })
          .returning()
      )[0];
    },
    async get(id?: number): Promise<any> {
      const query = db.select().from(financesTable);

      if (id) return (await query.where(byId(id)))[0];
      return await query;
    },
    async update(obj: any): Promise<any> {
      delete obj.createdAt;
      return await db.update(financesTable).set(obj).where(byId(obj.id)).returning();
    },
    async destroy(id: any): Promise<any> {
      return await db.delete(financesTable).where(byId(id));
    },
  };
}

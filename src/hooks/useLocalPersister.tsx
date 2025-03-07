import { eq } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/drizzle';
import migrations from '@/drizzle/migrations/migrations';
import { financesTable } from '@/drizzle/schema';
import { Persister } from '@/types/Persister';

migrate(db, migrations);

const byId = (id: number) => eq(financesTable.id, id);
export function useLocalPersister(): Persister {
  return {
    async create(obj: any): Promise<any> {
      return await db.insert(financesTable).values({ ...obj, createdAt: '' });
    },
    async get(id?: number): Promise<any> {
      const query = db.select().from(financesTable);

      if (id) return (await query.where(byId(id)))[0];
      return await query;
    },
    async update(obj: any): Promise<any> {
      delete obj.createdAt;
      return await db.update(financesTable).set(obj).where(byId(obj.id));
    },
    async destroy(id: any): Promise<any> {
      await db.delete(financesTable).where(byId(id));
    },
  };
}

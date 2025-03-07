import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/drizzle';
import migrations from '@/drizzle/migrations/migrations';
import { Persister } from '@/types/Persister';

migrate(db, migrations);
export function useLocalPersister(): Persister {
  return {
    create(obj: any): Promise<any> {
      throw new Error('Not implemented.');
    },
    get(id: number): Promise<any> {
      throw new Error('Not implemented.');
    },
    getAll(): Promise<any> {
      throw new Error('Not implemented.');
    },
    update(obj: any): Promise<any> {
      throw new Error('Not implemented.');
    },
    destroy(id: any): Promise<any> {
      throw new Error('Not implemented.');
    },
  };
}

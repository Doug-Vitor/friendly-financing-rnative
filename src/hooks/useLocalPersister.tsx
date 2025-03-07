import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/drizzle';
import migrations from '@/drizzle/migrations/migrations';

migrate(db, migrations);
export function useLocalPersister() {
  return {};
}

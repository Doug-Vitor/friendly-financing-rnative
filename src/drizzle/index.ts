import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';

import { DATABASE_NAME } from '@/constants';

const expo = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expo);

import { Slot } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import { DATABASE_NAME } from '@/constants';
import { CoreContextProvider } from '@/contexts';

import '../global.css';

export default function Layout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <CoreContextProvider>
        <Slot />
      </CoreContextProvider>
    </SQLiteProvider>
  );
}

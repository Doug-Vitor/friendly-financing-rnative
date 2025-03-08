import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import { DATABASE_NAME } from '@/constants';
import { CoreContextProvider } from '@/contexts';

import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        console.error('A mutation has failed:', error);
      },
    },
  },
});

export default function Layout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <QueryClientProvider client={queryClient}>
        <CoreContextProvider>
          <Slot />
        </CoreContextProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}

import { CoreContextProvider } from '@/contexts';
import { Slot } from 'expo-router';

import '../global.css';

export default function Layout() {
  return (
    <CoreContextProvider>
      <Slot />
    </CoreContextProvider>
  );
}

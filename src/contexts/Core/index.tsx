import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { AUTH_TYPE_STORAGE_KEY } from '@/constants';
import { AuthType } from '@/types';

const CoreContext = createContext({});
export function CoreContextProvider({ children }: PropsWithChildren) {
  const [authType, setAuthType] = useState<AuthType>();

  useEffect(() => {
    if (authType) return;

    AsyncStorage.getItem(AUTH_TYPE_STORAGE_KEY, (error, result) => {
      if (error) return console.error(error);
      onAuthTypeChange(result as AuthType);
    });
  }, [authType]);

  const onAuthTypeChange = (authType?: AuthType) => {
    if (authType) {
      setAuthType(authType);

      if (authType === AuthType.NO_ACCOUNT) {
        AsyncStorage.setItem(AUTH_TYPE_STORAGE_KEY, authType);
        router.replace('/dashboard');
      } else router.push(`/auth/${authType}`);
    }
  };

  return <CoreContext.Provider value={{ onAuthTypeChange }}>{children}</CoreContext.Provider>;
}

export function useCoreContext() {
  return useContext(CoreContext);
}

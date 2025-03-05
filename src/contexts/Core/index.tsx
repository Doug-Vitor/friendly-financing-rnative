import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { AUTH_TYPE_STORAGE_KEY } from '@/constants';
import { AuthType } from '@/types';

const CoreContext = createContext({});
export function CoreContextProvider({ children }: PropsWithChildren) {
  const [authType, setAuthType] = useState<AuthType>();
  const { navigate } = useNavigation();

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
      AsyncStorage.setItem(AUTH_TYPE_STORAGE_KEY, authType);
      navigate(authType === AuthType.NO_ACCOUNT ? 'dashboard' : `auth/${authType}`);
    }
  };

  return <CoreContext.Provider value={{ onAuthTypeChange }}>{children}</CoreContext.Provider>;
}

export function useCoreContext() {
  return useContext(CoreContext);
}

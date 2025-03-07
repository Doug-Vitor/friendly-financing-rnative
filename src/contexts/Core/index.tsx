import { router } from 'expo-router';
import Storage from 'expo-sqlite/kv-store';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { AUTH_TYPE_STORAGE_KEY } from '@/constants';
import { useLocalPersister, useOnlinePersister } from '@/hooks';
import { AuthType, Persister } from '@/types';

type Context = {
  onAuthTypeChange: (authType: AuthType) => void;
} & Persister;

const CoreContext = createContext<Context>({} as Context);
export function CoreContextProvider({ children }: PropsWithChildren) {
  const [authType, setAuthType] = useState<AuthType>();

  useEffect(() => {
    if (authType) return;
    Storage.getItem(AUTH_TYPE_STORAGE_KEY).then(onAuthTypeChange);
  }, [authType]);

  const onAuthTypeChange = (authType?: AuthType) => {
    if (authType) {
      setAuthType(authType);

      if (authType === AuthType.NO_ACCOUNT) {
        Storage.setItem(AUTH_TYPE_STORAGE_KEY, authType);
        router.replace('/dashboard');
      } else router.push(`/auth/${authType}`);
    }
  };

  const usePersister = useMemo(() => {
    if (authType) return authType === AuthType.NO_ACCOUNT ? useLocalPersister : useOnlinePersister;

    return () => ({});
  }, [authType]);

  const persister = usePersister() as Persister;
  return (
    <CoreContext.Provider value={{ onAuthTypeChange, ...persister }}>
      {children}
    </CoreContext.Provider>
  );
}

export function useCoreContext() {
  return useContext(CoreContext);
}

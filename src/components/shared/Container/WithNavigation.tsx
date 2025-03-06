import { Button } from '@components/ui';
import { router } from 'expo-router';
import { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: {
    enabled?: boolean;
    label: ReactNode;
  } & ({ href: string } | { onPress: () => void });
}

export function ContainerWithNavigation({ navigation, children }: PropsWithChildren<Props>) {
  return (
    <SafeAreaView className="h-full flex-col justify-between px-2 py-6">
      {children}

      <Button
        textClassName="font-bold text-lg"
        {...(navigation.enabled && {
          onPress: () => (navigation.onPress ? navigation.onPress() : router.push(navigation.href)),
        })}>
        {navigation.label}
      </Button>
    </SafeAreaView>
  );
}

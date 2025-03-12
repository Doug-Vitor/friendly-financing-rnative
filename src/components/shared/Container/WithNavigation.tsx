import { Href, router } from 'expo-router';
import { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text } from '@/components';

interface Props {
  title?: string;
  navigation: {
    enabled?: boolean;
    label: ReactNode;
  } & ({ href: string; onPress?: never } | { onPress: () => void; href?: never });
}

export function ContainerWithNavigation({ title, navigation, children }: PropsWithChildren<Props>) {
  return (
    <SafeAreaView className="h-full flex-col justify-between px-2 py-6">
      <View className="h-1/2 justify-between">
        {title ? <Text className="text-3xl font-bold">{title}</Text> : <View />}
        <View>{children}</View>
      </View>

      <View className="h-fit">
        <Button
          textClassName="font-bold text-lg"
          {...(navigation.enabled && {
            onPress: () =>
              navigation.onPress ? navigation.onPress() : router.push(navigation.href as Href),
          })}>
          {navigation.label}
        </Button>
      </View>
    </SafeAreaView>
  );
}

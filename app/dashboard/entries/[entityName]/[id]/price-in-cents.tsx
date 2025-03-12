import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useSharedEntry } from './useSharedEntry';

import { ContainerWithNavigation, Text, Input } from '@/components';
import { formatPrice, keepNumbers } from '@/helpers/number';

const days = Array.from({ length: 31 }).map((_, day) => day + 1);

export default function PriceInCents() {
  const { entityName, entry, saveEntry, isSavingEntry } = useSharedEntry({
    nextRouteOnSuccess: 'title',
  });

  const [{ priceInCents, expirationDay }, setEntry] = useState(entry ?? {});

  return (
    <ContainerWithNavigation
      title="Informar detalhes"
      navigation={{
        label: 'Confirmar',
        enabled: isSavingEntry === false && priceInCents > 0,
        onPress: () => saveEntry({ entry: { priceInCents, expirationDay } }),
      }}>
      <Text className="pb-3 text-xl font-bold">O valor em reais</Text>
      <Input
        keyboardType="number-pad"
        value={formatPrice(keepNumbers(priceInCents))}
        onChangeText={(value) => setEntry({ expirationDay, priceInCents: keepNumbers(value) })}
      />
      {entityName === 'bills' && (
        <>
          <Text className="mt-12 pb-3 text-xl font-bold">O dia de vencimento</Text>
          <View className="flex flex-row flex-wrap justify-center gap-2">
            {days.map((day) => (
              <TouchableOpacity
                key={`day-${day}`}
                className={`min-w-[10%] max-w-[10%] rounded-lg border border-primary-light p-2 dark:border-primary-dark ${expirationDay === day ? 'bg-primary-light dark:bg-primary-dark' : ''}`}
                onPress={() => setEntry({ priceInCents, expirationDay: day })}>
                <Text className="text-center text-lg">{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ContainerWithNavigation>
  );
}

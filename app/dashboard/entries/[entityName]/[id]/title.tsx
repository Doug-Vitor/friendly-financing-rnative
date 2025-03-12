import { useState } from 'react';

import { useSharedEntry } from './useSharedEntry';

import { ContainerWithNavigation, Input, Text } from '@/components';

export default function PriceInCents() {
  const { entry, saveEntry, isSavingEntry } = useSharedEntry({ replaceRouteOnSuccess: true });
  const [title, setTitle] = useState(entry.title);

  return (
    <ContainerWithNavigation
      title="Informe um nome para o registro"
      navigation={{
        label: 'Finalizar',
        enabled: isSavingEntry === false,
        onPress: () => saveEntry({ entry: { title } }),
      }}>
      <Text className="pb-3 text-xl font-bold">Não se preocupe, você pode pular essa etapa</Text>
      <Input
        placeholder="Ex.: Fatura do cartão, compras no supermercado..."
        onChangeText={setTitle}
      />
    </ContainerWithNavigation>
  );
}

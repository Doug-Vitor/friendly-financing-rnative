import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { ContainerWithNavigation, Checkable, Text } from '@/components';
import { useCoreContext } from '@/contexts';

const options = [
  {
    title: 'Crédito',
    description: 'Oba, entrou uma graninha na minha conta! 💸',
    type: 'credit',
  },
  {
    title: 'Débito',
    description: 'Eu gastei meu precioso dinheirinho. Mas será que eu gastei demais? 🥲',
    type: 'debit',
  },
  {
    title: 'Boleto',
    description:
      'Eu vou informar o dia do vencimento e o Friendly Financing vai me lembrar de pagá-lo! 👌🏻',
    type: 'bill',
  },
];

export default function SelectType() {
  const { create } = useCoreContext();
  const [selectedOption, setSelectedOption] = useState<string>();

  const entityName = selectedOption === 'bill' ? 'bills' : 'incomes';
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () =>
      await create(entityName, {
        expirationDay: 1,
        type: selectedOption,
      }),
    onSuccess: ({ id }) => router.push(`/dashboard/entries/${entityName}/${id}/price-in-cents`),
  });

  return (
    <ContainerWithNavigation
      title="Novo registro"
      navigation={{
        label: 'Confirmar',
        enabled: isPending === false && typeof selectedOption === 'string',
        onPress: mutateAsync,
      }}>
      <Text className="pb-3 text-xl font-bold">Estou inserindo um...</Text>

      <View className="gap-2">
        {options.map(({ type, ...option }) => (
          <Checkable
            {...option}
            key={type}
            checked={selectedOption === type}
            onPress={() => setSelectedOption(type === selectedOption ? undefined : type)}
          />
        ))}
      </View>
    </ContainerWithNavigation>
  );
}

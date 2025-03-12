import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ArrowDown, DollarSign, Trash } from 'lucide-react-native';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { Card } from '../Card';
import { Text } from '../ui';

import { formatPrice } from '@/helpers/number';
import { useCoreContext } from '@/contexts';

interface Props {
  data: any[];
  refetch: () => void;
}

const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
const propsTypeBased = {
  credit: {
    Icon: DollarSign,
    bgColor: 'bg-primary-light dark:bg-primary-dark',
  },
  debit: {
    Icon: ArrowDown,
    bgColor: 'bg-red-600',
    textColor: 'text-white',
  },
};

const RightComponent = ({ id, refetch }: any) => {
  const { destroy } = useCoreContext();
  const { mutateAsync } = useMutation({
    mutationFn: async () => await destroy('incomes', id),
    onSuccess: refetch,
  });

  return (
    <TouchableOpacity onPress={mutateAsync} className="justify-center rounded-full bg-white p-2">
      <Trash color="red" />
    </TouchableOpacity>
  );
};

export function DashboardVerticalList({ data, refetch }: Props) {
  return (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text className="pb-1 text-xl">Registros encontrados</Text>}
        ItemSeparatorComponent={() => <View className="my-1.5" />}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={formatPrice(item.priceInCents)}
            description={[item.title, dateFormat.format(new Date(item.createdAt))]
              .filter((value) => value)
              .join(', ')}
            onPress={() => router.push(`/dashboard/entries/incomes/${item.id}/price-in-cents`)}
            RightComponent={() => <RightComponent {...item} refetch={refetch} />}
            {...propsTypeBased[item.type as keyof typeof propsTypeBased]}
          />
        )}
      />
    </>
  );
}

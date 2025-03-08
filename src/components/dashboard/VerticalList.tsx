import { router } from 'expo-router';
import { ArrowDown, DollarSign } from 'lucide-react-native';
import { FlatList, View } from 'react-native';

import { Card } from '../Card';
import { Text } from '../ui';

import { formatPrice } from '@/helpers/number';

interface Props {
  data: any[];
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

export function DashboardVerticalList({ data }: Props) {
  return (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text className="pb-1 text-xl">Registros encontrados</Text>}
        ItemSeparatorComponent={() => <View className="my-1.5" />}
        data={[data,data,data,data,data].flat()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={formatPrice(item.priceInCents)}
            description={[item.title, dateFormat.format(new Date(item.createdAt))]
              .filter((value) => value)
              .join(', ')}
            onPress={() => router.push(`/dashboard/entries/incomes/${item.id}/price-in-cents`)}
            {...propsTypeBased[item.type]}
          />
        )}
      />
    </>
  );
}

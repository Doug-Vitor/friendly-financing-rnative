import { FlatList, ScrollView, View } from 'react-native';
import { ArrowDown, ChartNoAxesCombined, DollarSign } from 'lucide-react-native';

import { Card } from '../Card';
import { Text } from '../ui';

import { formatPrice } from '@/helpers/number';

interface Props {
  debit: number;
  credit: number;
}

export function DashboardSummary({ debit, credit }: Props) {
  const profit = credit - debit;

  return (
    <View className="py-3">
      <Text className="pb-1 text-xl">Resumo</Text>

      <View className="flex flex-row gap-2">
        <Card
          className="flex-1 bg-primary-light dark:bg-primary-dark"
          title={formatPrice(credit)}
          description="Ganhos"
          Icon={DollarSign}
        />
        <Card
          className="flex-1 bg-red-500"
          textColor="text-white"
          title={formatPrice(debit)}
          description="Gastos"
          Icon={ArrowDown}
        />
      </View>

      <Card
        className="mt-2 bg-blue-500"
        textColor="text-white"
        title={formatPrice(profit)}
        description={profit < 0 ? 'Sem lucros! 😥' : 'Com lucros! 🥵'}
        Icon={ChartNoAxesCombined}
      />
    </View>
  );
}

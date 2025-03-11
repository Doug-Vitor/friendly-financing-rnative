import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ListFilter, Plus } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DashboardSummary, DashboardVerticalList } from '@/components';
import { useCoreContext } from '@/contexts';
import { shadow } from '@/styles';

const commonBottomProps = {
  icon: { size: 26, color: 'black' },
  button: {
    style: shadow,
    className: 'rounded-full bg-primary-light p-3 dark:bg-primary-dark',
  },
};

export default function Dashboard() {
  const { get, filters } = useCoreContext();
  const { data, refetch } = useQuery({
    queryKey: [filters],
    queryFn: async () => await get('incomes', filters),
    initialData: { data: [], dashboard: {} },
  });

  return (
    <SafeAreaView className="relative h-full flex-1 px-2">
      <DashboardSummary {...data.dashboard} />
      <DashboardVerticalList data={data.data} refetch={refetch} />

      <View className="absolute bottom-3 right-3 flex w-fit items-center justify-center gap-2">
        <TouchableOpacity
          onPress={() => router.push('/dashboard/filter-modal')}
          {...commonBottomProps.button}>
          <ListFilter {...commonBottomProps.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/entries/select-type')}
          {...commonBottomProps.button}>
          <Plus {...commonBottomProps.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

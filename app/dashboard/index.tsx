import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ListFilter, Plus } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DashboardSummary, DashboardVerticalList } from '@/components';
import { useCoreContext } from '@/contexts';

const commonBottomProps = {
  buttonClassName: 'rounded-full bg-primary-light p-3 dark:bg-primary-dark',
  icon: { size: 26, color: 'black' },
};

export default function Dashboard() {
  const { get } = useCoreContext();
  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => await get('incomes'),
    initialData: { data: [], dashboard: {} },
  });

  return (
    <SafeAreaView className="relative h-full flex-1 px-3">
      <DashboardSummary {...data.dashboard} />
      <DashboardVerticalList data={data.data} />

      <View className="absolute bottom-3 right-3 flex w-fit items-center justify-center gap-2">
        <TouchableOpacity className={commonBottomProps.buttonClassName}>
          <ListFilter {...commonBottomProps.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/entries/select-type')}
          className={commonBottomProps.buttonClassName}>
          <Plus {...commonBottomProps.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components';
import { useCoreContext } from '@/contexts/Core';

export default function Dashboard() {
  const { get } = useCoreContext();
  const { data } = useQuery({ queryKey: [], queryFn: async () => await get('incomes') });

  return (
    <SafeAreaView className="relative h-full">
      <FlatList data={data ?? []} renderItem={({ item }) => <Text>{item.title}</Text>} />
      <TouchableOpacity
        onPress={() => router.push('/dashboard/entries/select-type')}
        className="absolute bottom-3 right-3 flex w-fit items-center justify-center rounded-full bg-primary-light p-3 dark:bg-primary-dark">
        <Plus size={26} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

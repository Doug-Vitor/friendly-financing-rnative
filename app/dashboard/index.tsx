import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  return (
    <SafeAreaView className="relative h-full">
      <TouchableOpacity
        onPress={() => router.push('/dashboard/entries/select-type')}
        className="absolute bottom-3 right-3 flex w-fit items-center justify-center rounded-full bg-primary-light p-3 dark:bg-primary-dark">
        <Plus size={26} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

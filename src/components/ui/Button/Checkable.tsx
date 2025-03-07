import { Text } from '@components/ui/Text';
import { CircleCheck } from 'lucide-react-native';
import { PropsWithoutRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface Props {
  title: string;
  description: string;
  checked: boolean;
}

export function Checkable({
  title,
  description,
  checked,
  className,
  ...props
}: PropsWithoutRef<TouchableOpacityProps & Props>) {
  return (
    <TouchableOpacity
      {...props}
      className={`rounded-xl border p-3 ${className} ${checked ? 'border-primary-light' : 'border-typography-light'}`}>
      <View className="flex-row justify-between">
        <Text className="font-bold">{title}</Text>
        {checked && <CircleCheck color="#8bff00" />}
      </View>

      <Text className="text-sm">{description}</Text>
    </TouchableOpacity>
  );
}

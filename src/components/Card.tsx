import { ArrowRight, LucideIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { Text } from './ui';

interface Props {
  title: string;
  description: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  Icon: LucideIcon;
  onPress?: () => void;
}

export function Card({
  title,
  description,
  className = '',
  bgColor = '',
  textColor = '',
  onPress,
  Icon,
}: Props) {
  const pressable = typeof onPress === 'function';
  const Element = pressable ? TouchableOpacity : View;

  return (
    <Element
      onPress={onPress}
      className={`flex flex-row justify-between gap-3 rounded-xl p-4 shadow-sm ${className} ${bgColor}`}>
      <View className="items-center justify-center rounded-full bg-white p-2 shadow-md">
        <Icon color="#000" />
      </View>

      <View className="w-full justify-center">
        <Text className={`text-lg font-bold ${textColor}`}>{title}</Text>
        {description && <Text className={`text-sm ${textColor}`}>{description}</Text>}
      </View>
    </Element>
  );
}

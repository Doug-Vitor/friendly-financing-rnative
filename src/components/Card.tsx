import { LucideIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { Text } from './ui';

import { shadow } from '@/styles';

interface Props {
  title: string;
  description: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  Icon: LucideIcon;
  RightComponent?: () => JSX.Element;
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
  RightComponent = () => <></>,
}: Props) {
  const pressable = typeof onPress === 'function';
  const Element = pressable ? TouchableOpacity : View;

  return (
    <Element
      onPress={onPress}
      style={shadow}
      className={`flex flex-row justify-between gap-3 rounded-xl p-4 ${className} ${bgColor}`}>
      <View style={shadow} className="items-center justify-center rounded-full bg-white p-2">
        <Icon color="#000" />
      </View>

      <View className="flex-1 justify-center">
        <Text className={`text-lg font-bold ${textColor}`}>{title}</Text>
        {description && <Text className={`text-sm ${textColor}`}>{description}</Text>}
      </View>

      <RightComponent />
    </Element>
  );
}

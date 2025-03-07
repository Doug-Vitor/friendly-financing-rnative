import { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Text } from '@/components/ui';

interface Props {
  textClassName: string;
}

export function Button({
  className,
  textClassName,
  children,
  ...props
}: PropsWithChildren<TouchableOpacityProps & Props>) {
  return (
    <TouchableOpacity
      {...props}
      className={`rounded-lg bg-primary-light p-3 dark:bg-primary-dark ${className}`}>
      <Text className={`text-center  ${textClassName}`}>{children}</Text>
    </TouchableOpacity>
  );
}

export * from './Checkable';

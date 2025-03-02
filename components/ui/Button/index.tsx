import { PropsWithChildren } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

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
      <Text
        className={`text-center text-typography-light dark:text-typography-dark ${textClassName}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export * from './Checkable';

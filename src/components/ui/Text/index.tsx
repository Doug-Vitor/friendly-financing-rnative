import { Text as RNText, TextProps } from 'react-native';

export function Text({ className, ...props }: TextProps) {
  return (
    <RNText {...props} className={`text-typography-light dark:text-typography-dark ${className}`} />
  );
}

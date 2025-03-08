import { TextInput, TextInputProps } from 'react-native';

export function Input({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      {...props}
      className={`border-b-[1px] border-primary-light pb-2 pt-0 focus:border-b-2 dark:border-primary-dark ${className}`}
    />
  );
}

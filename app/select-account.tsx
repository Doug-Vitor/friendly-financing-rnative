import { ContainerWithNavigation } from '@components/shared';
import { Checkable } from '@components/ui';
import { useCoreContext } from '@contexts/Core';
import { useState } from 'react';
import { View } from 'react-native';

import { AuthType } from '@/types';

const options = [
  {
    title: 'Já me cadastrei',
    description: 'Entrar em uma conta existente.',
    authType: AuthType.SIGN_IN,
  },
  {
    title: 'Quero me cadastrar',
    description: 'Você poderá usar sua conta e informações em outro dispositivo.',
    authType: AuthType.SIGN_UP,
  },
  {
    title: 'Não quero me cadastrar',
    description:
      'Você ainda poderá usar nossas funcionalidades, mas não poderá acessar sua conta em outro dispositivo.',
    authType: AuthType.NO_ACCOUNT,
  },
];

export default function SelectAccount() {
  const { onAuthTypeChange } = useCoreContext();
  const [selectedAuthType, setSelectedAuthType] = useState<AuthType>();

  return (
    <ContainerWithNavigation
      navigation={{
        enabled: selectedAuthType === AuthType.NO_ACCOUNT,
        label: 'Confirmar escolha',
        onPress: () => onAuthTypeChange(selectedAuthType),
      }}>
      <View />
      <View className="gap-2">
        {options.map(({ authType, ...option }) => (
          <Checkable
            {...option}
            key={authType}
            checked={selectedAuthType === authType}
            onPress={() =>
              setSelectedAuthType(authType === selectedAuthType ? undefined : authType)
            }
          />
        ))}
      </View>
    </ContainerWithNavigation>
  );
}

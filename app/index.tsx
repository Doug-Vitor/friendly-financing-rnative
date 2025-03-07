import { ContainerWithNavigation } from '@components/shared';
import { Text } from '@components/ui';

export default function Home() {
  return (
    <ContainerWithNavigation
      navigation={{ enabled: true, label: 'Vamos começar!', href: 'select-account' }}>
      <Text>Friendly Financing</Text>
    </ContainerWithNavigation>
  );
}

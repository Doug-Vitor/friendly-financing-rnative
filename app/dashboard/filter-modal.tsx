import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ContainerWithNavigation, Text } from '@/components';
import { useCoreContext } from '@/contexts';

const LabeledDatePicker = ({
  label,
  value,
  onChange,
  momentFn,
}: {
  label: string;
  value: number;
  momentFn: string;
  onChange: (timestamp: number) => void;
}) => (
  <View className="w-full flex-row justify-center pb-2">
    <View className="w-[75%] flex-row items-center justify-between">
      <Text className="text-end">{label}</Text>
      <DatePicker
        value={value ? new Date(value) : new Date()}
        onChange={(e) =>
          onChange(+new Date(moment(new Date(e.nativeEvent.timestamp))[momentFn]('day')))
        }
      />
    </View>
  </View>
);

export default function FilterModal() {
  const { filters, setFilters } = useCoreContext();
  const [unappliedFilters, setUnappliedFilters] = useState(filters);

  useEffect(() => {
    setUnappliedFilters(filters);
  }, [filters]);

  return (
    <ContainerWithNavigation
      title="Filtrar registros"
      navigation={{
        enabled: true,
        label: 'Aplicar filtros',
        onPress: () => {
          setFilters(unappliedFilters);
          router.dismiss();
        },
      }}>
      <LabeledDatePicker
        label="Criado a partir de"
        value={unappliedFilters?.createdAt?.from}
        momentFn="startOf"
        onChange={(from) =>
          setUnappliedFilters({
            ...unappliedFilters,
            createdAt: {
              ...(unappliedFilters.createdAt ?? {}),
              from,
            },
          })
        }
      />
      <LabeledDatePicker
        label="Criado até"
        value={unappliedFilters?.createdAt?.to}
        momentFn="endOf"
        onChange={(to) =>
          setUnappliedFilters({
            ...unappliedFilters,
            createdAt: {
              ...(unappliedFilters.createdAt ?? {}),
              to,
            },
          })
        }
      />
    </ContainerWithNavigation>
  );
}

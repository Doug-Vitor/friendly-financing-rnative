import { useMutation, useQuery } from '@tanstack/react-query';
import { Href, router, useLocalSearchParams } from 'expo-router';

import { useCoreContext } from '@/contexts';

interface PropsWithNextRoute {
  replaceRouteOnSuccess?: never;
  nextRouteOnSuccess: string;
}

interface PropsWithReplace {
  replaceRouteOnSuccess: boolean;
  nextRouteOnSuccess?: never;
}

export function useSharedEntry({
  replaceRouteOnSuccess,
  nextRouteOnSuccess,
}: PropsWithNextRoute | PropsWithReplace) {
  const { getById, update } = useCoreContext();
  const { id, entityName } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: [id],
    queryFn: async () => await getById(entityName, id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ entry }: any) => await update(entityName, { ...data, ...entry }),
    onSuccess: () =>
      replaceRouteOnSuccess
        ? router.replace('/dashboard')
        : router.push(`/dashboard/entries/${entityName}/${id}/${nextRouteOnSuccess}` as Href),
  });

  return { id, entityName, entry: data, saveEntry: mutateAsync, isSavingEntry: isPending };
}

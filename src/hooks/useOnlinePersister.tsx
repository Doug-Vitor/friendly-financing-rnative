import { Persister } from '@/types/Persister';

export function useOnlinePersister(): Persister {
  return {
    create(obj: any): Promise<any> {
      throw new Error('Not implemented.');
    },
    get(id?: number): Promise<any> {
      throw new Error('Not implemented.');
    },
    update(obj: any): Promise<any> {
      throw new Error('Not implemented.');
    },
    destroy(id: any): Promise<any> {
      throw new Error('Not implemented.');
    },
  };
}

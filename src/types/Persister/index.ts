export interface Persister {
  create: (obj: any) => Promise<any>;
  get: (id: number) => Promise<any>;
  getAll: () => Promise<any>;
  update: (obj: any) => Promise<any>;
  destroy: (id: any) => Promise<any>;
}

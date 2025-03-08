export interface Persister {
  create: (entityName: any, obj: any) => Promise<any>;
  get: (entityName: any, id?: number) => Promise<any>;
  update: (entityName: any, obj: any) => Promise<any>;
  destroy: (entityName: any, id: any) => Promise<any>;
}

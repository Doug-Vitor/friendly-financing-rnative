export interface Persister {
  create: (entityName: any, obj: any) => Promise<any>;
  get: (entityName: any, filters?: any) => Promise<any>;
  getById: (entityName: any, id: any) => Promise<any>;
  update: (entityName: any, obj: any) => Promise<any>;
  destroy: (entityName: any, id: any) => Promise<any>;
}

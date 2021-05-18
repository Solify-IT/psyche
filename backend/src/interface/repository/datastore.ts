export default interface IDatastore {
  exists<T>(username: string): Promise<Boolean>;
  fetchAll<T>(tableName: string): Promise<T[]>;
  fetchAllWhere<T>(tableName: string, condition: any) : Promise<T[]>;
  fetchOne<T>(tableName: string, condition: any): Promise<T>;
  save<T>(tableName: string, data: T): Promise<T>;
  bulkInsert<T>(tableName: string, data: T[]): Promise<T[]>;
}

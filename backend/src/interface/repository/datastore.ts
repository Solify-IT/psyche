export default interface IDatastore {
  fetchAll<T>(tableName: string): Promise<T[]>;
  fetchOne<T>(tableName: string, condition: any): Promise<T>;
}

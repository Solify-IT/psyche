export default interface IDatastore {
  fetchAll<T>(tableName: string): Promise<T[]>;
}

import { Graph, GraphData, GroupByAndCountBuilder } from '@types';

export default interface IDatastore {
  fetchAll<T>(tableName: string): Promise<T[]>;
  fetchAllWhere<T>(tableName: string, condition: any) : Promise<T[]>;
  fetchOne<T>(tableName: string, condition: any): Promise<T>;
  save<T>(tableName: string, data: T): Promise<T>;
  bulkInsert<T>(tableName: string, data: T[]): Promise<T[]>;
  groupByAndCount(builder: GroupByAndCountBuilder) : Promise<GraphData[]>;
  delete<T>(tableName: string, id: number): Promise<T>;

}

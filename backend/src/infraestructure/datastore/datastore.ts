import { GraphData, GroupByAndCountBuilder } from '@types';
import { IDatastore } from 'interface/repository';
import { getConnection } from 'typeorm';

export default class Datastore implements IDatastore {
  async fetchAllWhere<T>(tableName: string, condition: any): Promise<T[]> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    const items: T[] = await repository.find(condition);

    return items;
  }

  async bulkInsert<T>(tableName: string, data: T[]): Promise<T[]> {
    const connection = getConnection();
    let results : T[] = [];
    await connection.transaction(async (transactionalEntityManager) => {
      const repository = transactionalEntityManager.getRepository<T>(tableName);
      const saveReturn = await repository.save<T>(data);
      results = saveReturn;
    });
    return results;
  }

  async save<T>(tableName: string, data: T): Promise<T> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    const result = await repository.save<T>(data);
    return result;
  }

  async fetchOne<T>(tableName: string, condition: any): Promise<T> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    const item: T = await repository.findOne(condition);

    return item;
  }

  async fetchAll<T>(tableName: string): Promise<T[]> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    const items: T[] = await repository.find();

    return items;
  }

  async groupByAndCount<T>(
    builder: GroupByAndCountBuilder,
  ): Promise<GraphData[]> {
    const connection = getConnection();
    const column = builder.field;
    const select = builder.isAge ? `date_part('year', AGE(${builder.field}))` : column;
    const groupBy = builder.isAge ? 'age' : column;
    const items = await connection.getRepository<T>(
      builder.tableName,
    ).createQueryBuilder(builder.tableName)
      .select(select, groupBy)
      .addSelect('COUNT(id)')
      .where(builder.condition)
      .groupBy(groupBy)
      .getRawMany();

    const graphData : GraphData[] = items.map((item) => {
      let label;
      if (item[groupBy] === false) {
        label = 'No';
      } else if (item[groupBy] === true) {
        label = 'Si';
      } else {
        label = item[groupBy];
      }
      const value = item.count;
      const newGraphData : GraphData = {
        label,
        value,
      };
      return newGraphData;
    });
    return builder.sort ? graphData.sort(
      (obj1, obj2) => Number(obj1.label) - Number(obj2.label),
    ) : graphData;
  }

  async delete<T>(tableName: string, id: number): Promise<T> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    await repository.delete(id);
    const found = await repository.findOne(id);
    return found;
  }

  async count<T>(tableName: string, condition?: any): Promise<number> {
    const connection = getConnection();
    const repository = connection.getRepository<T>(
      tableName,
    );
    const items: T[] = await repository.find(condition);

    return items.length;
  }
}

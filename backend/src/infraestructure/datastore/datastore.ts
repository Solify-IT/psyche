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
    tableName: string, field: string, isAge?: boolean,
  ): Promise<any[]> {
    const connection = getConnection();
    const select = isAge ? `date_part('year', AGE(${tableName}.${field}))` : `${tableName}.${field}`;
    const groupBy = isAge ? 'age' : field;
    const items = await connection.getRepository<T>(tableName).createQueryBuilder(tableName)
      .select(select, isAge ? 'age' : field)
      .addSelect('COUNT(id)')
      .groupBy(groupBy)
      .getRawMany();
    return items;
  }

  async delete<T>(tableName: string, id: number): Promise<T> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    await repository.delete(id);
    const found = await repository.findOne(id);
    return found;
  }
}

import { IDatastore } from 'interface/repository';
import { createQueryBuilder, getConnection } from 'typeorm';

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

  async delete<T>(tableName: string, id: number): Promise<T> {
    const connection = getConnection();
    const repository = connection.manager.getRepository<T>(tableName);
    await repository.delete(id);
    const found = await repository.findOne(id);
    return found;
  }

  /* async fetchAllJoining(tableName: string, tableName2: string): Promise<void> {
    const connection = getConnection();
    const repositoryT1 = connection.manager.getRepository(tableName);
    const repositoryT2 = connection.manager.getRepository(tableName2);
    await repositoryT1

    const usersActives: T[] = createQueryBuilder(tableName)
      .innerJoinAndSelect("patient.record_id","record","record.active = :isActive",{ isActive: false})
      .getRawMany();
      return usersActives;
  }
} */

}

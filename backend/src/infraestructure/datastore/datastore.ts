/* eslint-disable @typescript-eslint/no-unused-vars */
import { wrapError } from '@types';
import { Doctor, Patient } from 'domain/model';
import { IDatastore } from 'interface/repository';
import { Entity, getConnection } from 'typeorm';

export default class Datastore implements IDatastore {
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
}

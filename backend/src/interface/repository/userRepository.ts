import { wrapError } from '@types';
import { User } from 'domain/model';
import IUserRepository from 'app/repository/userRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import PatientArea from 'domain/model/user/patientArea';
import IDatastore from './datastore';

export default class UserRepository implements IUserRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async getUserPatientAreas(id: number): Promise<PatientArea[]> {
    const [areas, error] = await wrapError(
      this.datastore.fetchAllWhere<PatientArea>('PatientArea', {
        userId: id,
      }),
    );
    if (error) {
      throw error;
    }
    if (areas) {
      return areas;
    }
    throw new NotFoundError('No se encontró ningún patient area');
  }

  async modifyProfile(areas: PatientArea[]): Promise<PatientArea[]> {
    const [result, error] = await wrapError(
      this.datastore.bulkInsert<PatientArea>('PatientArea', areas),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async registerProfile(areas: PatientArea[]): Promise<PatientArea[]> {
    const [result, error] = await wrapError(
      this.datastore.bulkInsert<PatientArea>('PatientArea', areas),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async setUserFirstTime(id: number, firstTime: boolean) : Promise<User> {
    const [result, error] = await wrapError(
      this.datastore.save<User>('User', { id, firstTime } as any),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async login(username: string, password: string): Promise<User> {
    const [user, error] = await wrapError(
      this.datastore.fetchOne<User>('User', {
        username,
        password,
      }),
    );
    if (error) {
      throw error;
    }
    if (user) {
      return user;
    }
    throw new NotFoundError('No se encontro al usuario');
  }

  async register(user: User): Promise<User> {
    const [result, error] = await wrapError(
      this.datastore.save<User>('User', user),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async findOne(id: number): Promise<User> {
    const [users, error] = await wrapError(
      this.datastore.fetchOne<User>('User', { id }),
    );

    if (error) {
      throw error;
    }

    return users;
  }
}

import { wrapError } from '@types';
import { User } from 'domain/model';
import IUserRepository from 'app/repository/userRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import PatientArea from 'domain/model/user/patientArea';
import IDatastore from './datastore';

const bcrypt = require('bcrypt');

export default class UserRepository implements IUserRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async changePassword(id: number, password: string): Promise<User> {
    const [result, error] = await wrapError(
      this.datastore.save('User', { id, password }),
    );

    if (error) {
      throw error;
    }
    return result as User;
  }

  async updateProfile(user: User): Promise<User> {
    const [result, error] = await wrapError(
      this.datastore.save<User>('User', user),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async getUser(username: string): Promise<User> {
    const [user, error] = await wrapError(
      this.datastore.fetchOne<User>('User', {
        username,
      }),
    );
    if (error) {
      throw error;
    }
    if (user) {
      return user;
    }
    throw new NotFoundError('El nombre esta disponible');
  }

  async getAll(): Promise<User[]> {
    const [users, error] = await wrapError(
      this.datastore.fetchAll<User>('User'),
    );
    if (error) {
      throw error;
    }
    if (users) {
      return users;
    }
    throw new NotFoundError('No se encontró ningun usuario registrado');
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

  async registerDoctorProfile(id: number,
    areas: PatientArea[], workSchedule: string): Promise<PatientArea[]> {
    const [result, error] = await wrapError(
      this.datastore.bulkInsert<PatientArea>('PatientArea', areas),
    );
    if (error) {
      throw error;
    }

    const [, userError] = await wrapError(
      this.datastore.save('User', { id, workSchedule }),
    );

    if (userError) {
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
      }),
    );
    if (error) {
      throw error;
    }
    if (user) {
      // const matchPassword = await bcrypt.compare(password, user.password);
      const matchPassword = true;
      if (matchPassword) {
        return user;
      }
    }
    throw new NotFoundError('No se encontró al usuario');
  }

  async register(user: User): Promise<User> {
    const password = await bcrypt.hash(user.password, 8);
    const [result, error] = await wrapError(
      this.datastore.save<User>('User', { ...user, password }),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async findAll(): Promise<User[]> {
    const [users, error] = await wrapError(
      this.datastore.fetchAll<User>('User'),
    );

    if (error) {
      throw error;
    }

    return users;
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

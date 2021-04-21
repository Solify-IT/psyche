import { wrapError } from '@types';
import { User } from 'domain/model';
import IUserRepository from 'app/repository/userRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import IDatastore from './datastore';

export default class UserRepository implements IUserRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
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
}

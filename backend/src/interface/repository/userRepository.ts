import { wrapError } from '@types';
import { User } from 'domain/model';
import IUserRepository from 'app/repository/userRepository';
import IDatastore from './datastore';

export default class UserRepository implements IUserRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async login(username: string, password: string): Promise<User> {
    console.log(username, password);
    const [user, error] = await wrapError(
      this.datastore.fetchOne<User>('User', {
        username,
        password,
      }),
    );
    console.log(`Repository: ${user}`);
    if (error) {
      throw error;
    }
    return user;
  }
}

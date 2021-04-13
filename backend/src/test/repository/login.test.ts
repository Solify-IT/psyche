import { wrapError } from '@types';
import { User } from 'domain/model';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

describe('User repository', () => {
  const username = 'testuser';
  const password = 'testpass';

  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  const datastore: Datastore = new Datastore();
  const userRepository : UserRepository = new UserRepository(datastore);
  const user : User = {
    id: 1, username, password, email: 'test@mail.com', role: 'role',
  };
  it('should return user if found', async () => {
    await getConnection().getRepository<User>(User).insert(user);
    userRepository.login(username, password).then((result) => {
      expect(result.username === 'testuser');
    });
  });

  it('should return error if username not found', async () => {
    await getConnection().getRepository<User>(User).insert(user);
    const [result, error] = await wrapError(userRepository.login('notMyUser', password));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });

  it('should return error if password not found', async () => {
    await getConnection().getRepository<User>(User).insert(user);
    const [result, error] = await wrapError(userRepository.login(username, 'notmypass'));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });
});

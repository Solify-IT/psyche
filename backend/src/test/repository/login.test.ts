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
    id: 1, username, password, email: 'test@mail.com', role: 'role', address: 'Av Luz 93', name: 'carlos', zipCode: '66777',
  };
  test('should return user i found', async () => {
    await getConnection().getRepository<User>(User).insert(user);
    const result = await userRepository.login(username, password);
    expect(result.username).toEqual(username);
    expect(result.password).toEqual(password);
  });

  test('should return error if username not found', async () => {
    await getConnection().getRepository<User>(User).save(user);
    const [result, error] = await wrapError(userRepository.login('notMyUser', password));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });

  test('should return error if password not found', async () => {
    await getConnection().getRepository<User>(User).save(user);
    const [result, error] = await wrapError(userRepository.login(username, 'notmypass'));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });
});

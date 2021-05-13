import { wrapError } from '@types';
import { User } from 'domain/model';
import userFixture from 'fixtures/user';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

describe('User repository', () => {
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
  const user : User = userFixture;
  const { username } = user;
  const { password } = user;

  test('should return user if found', async () => {
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

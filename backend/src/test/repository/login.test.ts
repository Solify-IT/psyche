import { wrapError } from '@types';
import { User } from 'domain/model';
import userFixture from 'fixtures/user';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

const bcrypt = require('bcrypt');

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

  test('should return user if found', async () => {
    const password = await bcrypt.hash(userFixture.password, 8);
    const user : User = { ...userFixture, password };
    const { username } = user;
    await getConnection().getRepository<User>(User).insert(user);
    const result = await userRepository.login(username, userFixture.password);
    expect(result.username).toEqual(username);
    expect(result.password).toEqual(password);
  });

  test('should return error if username not found', async () => {
    const password = await bcrypt.hash(userFixture.password, 8);
    const user : User = { ...userFixture, password };
    await getConnection().getRepository<User>(User).save(user);
    const [result, error] = await wrapError(userRepository.login('notMyUser', userFixture.password));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });

  test('should return error if password not found', async () => {
    const password = await bcrypt.hash(userFixture.password, 8);
    const user : User = { ...userFixture, password };
    const { username } = user;
    await getConnection().getRepository<User>(User).save(user);
    const [result, error] = await wrapError(userRepository.login(username, 'notmypass'));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });
});

import { wrapError } from '@types';
import { User } from 'domain/model';
import userFixture from 'fixtures/user';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

describe('User repository', () => {
  const user = userFixture;
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
  test('should return an user', async () => {
    await getConnection().getRepository<User>(User);
    const result = await userRepository.findOne(user.id);
    expect(result).toEqual(user.id);
  });

  test('should return error if user not found', async () => {
    await getConnection().getRepository<User>(User);
    const [result, error] = await wrapError(userRepository.findOne(user.id));
    expect(error).toBeDefined();
    expect(result).toEqual(user.id);
  });
});

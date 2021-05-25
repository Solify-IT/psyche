import { User } from 'domain/model';
import userFixture from 'fixtures/user';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

beforeAll(async () => {
  await testConnection.create();
});

afterAll(async () => {
  await testConnection.close();
});

beforeEach(async () => {
  await testConnection.clear();
});

describe('User repository', () => {
  const datastore: Datastore = new Datastore();
  const userRepository : UserRepository = new UserRepository(datastore);
  const newPassword = 'newPassword';
  const user : User = userFixture;

  test('should change password', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    const result = await userRepository.changePassword(userResult.id, newPassword);
    expect(result).toBeDefined();
    expect(result.password).toEqual(newPassword);
  });
});

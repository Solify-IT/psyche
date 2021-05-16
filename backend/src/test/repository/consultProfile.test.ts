import { wrapError } from '@types';
import userFixture from 'fixtures/user';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';

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

  test('should get', async () => {
    const [result, error] = await wrapError(userRepository.findOne(user.id));
    expect(error).toBeNull();
    expect(result).toEqual(user.id);
  });
});

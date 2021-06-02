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
  const user : User = userFixture;

  test('should modify user first time status', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    expect(userResult.firstTime).toEqual(true);
    const result = await userRepository.setUserFirstTime(1, false);
    expect(result).toBeDefined();
    expect(result.firstTime).toEqual(false);
    expect(result.id === userResult.id);
  });

  test('should deactive account user', async () => {
    const userPsico : User = {
      username: 'alice33',
      email: 'alice@email.com',
      password: 'Alice123',
      name: 'Alice B',
      lastName: 'Alice B',
      role: 'Psicologo',
      zipCode: '12345',
      address: 'Av First 123 San Francisco',
      active: true,
      firstTime: true,
      professionalLicense: 'Licencia',
      patients: null,
    };
    const userTest = await getConnection().getRepository<User>(User).save(user);
    expect(userPsico.active).toEqual(userTest.active);
    const result = await userRepository.deactiveAccount(userTest.id);
    expect(result.active).toEqual(false);
  });
});

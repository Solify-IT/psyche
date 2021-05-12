import { User } from 'domain/model';
import PatientArea from 'domain/model/user/patientArea';
import patientAreaFixture from 'fixtures/patientArea';
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
  const areas : PatientArea[] = patientAreaFixture;
  const user : User = userFixture;

  test('should register patient areas', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    const result = await userRepository.registerProfile(areas);
    expect(result).toBeDefined();
    expect(result.length).toEqual(areas.length);
    expect(userResult.id).toEqual(result[0].userId);
  });

  test('should modify user first time status', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    expect(userResult.firstTime).toEqual(true);
    const result = await userRepository.setUserFirstTime(1, false);
    expect(result).toBeDefined();
    expect(result.firstTime).toEqual(false);
    expect(result.id === userResult.id);
  });
});

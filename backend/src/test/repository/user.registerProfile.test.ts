import { User } from 'domain/model';
import PatientArea from 'domain/model/user/patientArea';
import patientAreaFixture from 'fixtures/patientArea';
import userFixture from 'fixtures/profile';
import Datastore from 'infraestructure/datastore/datastore';
import { UserRepository } from 'interface/repository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

describe('Patient  profile repository', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  const areas: PatientArea[] = patientAreaFixture;

  const user : User = userFixture;

  const workSchedule = '08:00 - 12:00';
  const datastore: Datastore = new Datastore();
  const userRepository : UserRepository = new UserRepository(datastore);

  test('should register patient profile', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    const result = await userRepository.registerProfile(userResult.id, areas, workSchedule);
    expect(result).toBeDefined();
    const finalUserResult = await getConnection().getRepository<User>(User).findOneOrFail(
      userResult.id,
    );
    expect(finalUserResult.workSchedule).toEqual(workSchedule);
    expect(finalUserResult.patientAreas.length).toEqual(areas.length);
  });
});

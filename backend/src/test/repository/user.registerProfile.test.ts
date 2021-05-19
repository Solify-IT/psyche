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

  test('should modify patient profile', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    const registerResult = await userRepository.registerProfile(userResult.id, areas, workSchedule);

    const newWorkSchedule = '13:00 - 18:00';
    const newPatientAreas : PatientArea[] = [
      {
        id: registerResult[0].id,
        name: 'Prueba',
        userId: 1,
        checked: false,
      },
      {
        id: registerResult[1].id,
        name: 'Prueba 2',
        userId: 1,
        checked: true,
      },
    ];

    const result = await userRepository.modifyProfile(
      userResult.id, newPatientAreas, newWorkSchedule,
    );
    expect(result).toBeDefined();
    const finalUserResult = await getConnection().getRepository<User>(User).findOneOrFail(
      userResult.id,
    );
    expect(finalUserResult.workSchedule).toEqual(newWorkSchedule);
    expect(finalUserResult.patientAreas[0]).toEqual(newPatientAreas[0]);
  });
});

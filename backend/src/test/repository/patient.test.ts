import { wrapError } from '@types';
import { Patient } from 'domain/model';
import patientFixture from 'fixtures/patient';
import Datastore from 'infraestructure/datastore/datastore';
import PatientRepository from 'interface/repository/patientRepository';
import objectsEqual from 'test/utils/objectsEqual';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

describe('Patient repository', () => {
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
  const patientRepository : PatientRepository = new PatientRepository(datastore);
  test('should return patient if found', async () => {
    await getConnection().getRepository<Patient>(Patient).save(patientFixture);
    const result = await patientRepository.findPatient(1);
    expect(result).toBeDefined();
    expect(objectsEqual(patientFixture, result, ['forms'])).toEqual(true);
    expect(result.forms.length).toEqual(2);
  });

  test('should return error if patient not found', async () => {
    await getConnection().getRepository<Patient>(Patient).save(patientFixture);
    const [result, error] = await wrapError(patientRepository.findPatient(99));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });
});

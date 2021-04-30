import { wrapError } from '@types';
import { Patient } from 'domain/model';
import Datastore from 'infraestructure/datastore/datastore';
import PatientRepository from 'interface/repository/patientRepository';
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
  test('should return all patients', async () => {
    await getConnection().getRepository<Patient>(Patient);
    const result = await patientRepository.findAll();
    expect(result).toBeDefined();
  });

  test('should return error if patient not found', async () => {
    await getConnection().getRepository<Patient>(Patient);
    const [result, error] = await wrapError(patientRepository.findAll());
    expect(error).toBeDefined();
    expect(result).toBeDefined();
  });
});

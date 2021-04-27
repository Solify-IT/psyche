import { wrapError } from '@types';
import Datastore from 'infraestructure/datastore/datastore';
import PatientRepository from 'interface/repository/patientRepository';
import testConnection from 'test/utils/testConnection';

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

  test('should get', async () => {
    const [result, error] = await wrapError(patientRepository.findAll());
    expect(error).toBeNull();
    expect(result).toBeDefined();
  });
});

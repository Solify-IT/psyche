import { Patient } from 'domain/model';
import patientFixture from 'fixtures/patient';
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

  const patients: Patient[] = [
    patientFixture,
    patientFixture,
    patientFixture,
  ];

  const datastore: Datastore = new Datastore();
  const patientRepository : PatientRepository = new PatientRepository(datastore);

  test('should register patients with record', async () => {
    const result = await patientRepository.register(patients);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.active).toEqual(true);
    expect(result.patients.length === patients.length);
  });
});

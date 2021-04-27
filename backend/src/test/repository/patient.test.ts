import { wrapError } from '@types';
import { Patient } from 'domain/model';
import Record from 'domain/model/record';
import patientFixture from 'fixtures/patient';
import recordFixture from 'fixtures/record';
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

  const patients: Patient[] = [
    patientFixture,
    patientFixture,
    patientFixture,
  ];

  const datastore: Datastore = new Datastore();
  const patientRepository : PatientRepository = new PatientRepository(datastore);
  test('should return record if found', async () => {
    await getConnection().getRepository<Record>(Record).save(recordFixture);
    const result = await patientRepository.findRecord(1);
    expect(result).toBeDefined();
    expect(objectsEqual(recordFixture, result, ['forms', 'patients'])).toEqual(true);
  });

  test('should return error if patient not found', async () => {
    await getConnection().getRepository<Record>(Record).save(recordFixture);
    const [result, error] = await wrapError(patientRepository.findRecord(99));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });

  test('should register patients with record', async () => {
    const result = await patientRepository.register(patients);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.active).toEqual(true);
    expect(result.patients.length === patients.length);
  });
});

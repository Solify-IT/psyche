import { wrapError } from '@types';
import PatientForm from 'domain/model/patientForm';
import Record from 'domain/model/record';
import patientFormFixture from 'fixtures/patientForm';
import recordFixture from 'fixtures/record';
import Datastore from 'infraestructure/datastore/datastore';
import FormRepository from 'interface/repository/formRepository';
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
describe('Patient form repository', () => {
  const datastore: Datastore = new Datastore();
  const formRepository : FormRepository = new FormRepository(datastore);
  const patientForm : PatientForm = patientFormFixture;

  test('should register new patient form if record exists', async () => {
    await getConnection().getRepository<Record>(Record).save(recordFixture);
    const [result, error] = await wrapError(formRepository.registerPatientForm(patientForm));
    expect(error).toBeNull();
    expect(result).toBeDefined();
    expect(result.fields.length).toEqual(2);
  });
});

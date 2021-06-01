import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
import { Patient } from 'domain/model';
import Record from 'domain/model/record';
import patientFixture from 'fixtures/patient';
import Datastore from 'infraestructure/datastore/datastore';
import { PatientPresenter } from 'interface/presenter';
import { PatientRepository } from 'interface/repository';
import testConnection from 'test/utils/testConnection';

jest.mock('interface/repository/patientRepository');
jest.mock('infraestructure/datastore/datastore');

const datastore = new Datastore();
const patientRepository = new PatientRepository(datastore);
const patientPresenter = new PatientPresenter();
const interactor = new PatientInteractor(patientRepository, patientPresenter);

describe('Patient register', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  const patients : Patient[] = [patientFixture, patientFixture];
  const record : Record = {
    id: 1,
    patients,
    active: true,
    updatedAt: new Date(),
  };
  test('should return record when single patient is passed', async () => {
    jest.spyOn(
      patientRepository, 'register',
    ).mockImplementation(async () => record);
    const [result, error] = await wrapError(interactor.register(patientFixture));

    expect(error).toBe(null);
    expect(result).toBeDefined();
    expect(result.patients[0].name).toEqual(patientFixture.name);
  });

  test('should return record when list of patients is passed', async () => {
    jest.spyOn(
      patientRepository, 'register',
    ).mockImplementation(async () => record);
    const [result, error] = await wrapError(interactor.register(patients));

    expect(error).toBe(null);
    expect(result).toEqual(record);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      patientRepository, 'register',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.register(patients));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

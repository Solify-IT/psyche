import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
import patientFixture from 'fixtures/patient';
import recordFixture from 'fixtures/record';
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

const record = recordFixture;
const patients = patientFixture;

describe('Patient detail', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  test('should return record when record is found', async () => {
    jest.spyOn(
      patientRepository, 'findRecord',
    ).mockImplementation(async () => record);
    const [result, error] = await wrapError(interactor.getRecord(1));

    expect(error).toBe(null);
    expect(result).toEqual(record);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      patientRepository, 'findRecord',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.getRecord(1));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

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

  test('should catch error when try to inactive a record', async () => {
    jest.spyOn(
      patientRepository, 'archiveRecord',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.archiveRecord(1));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

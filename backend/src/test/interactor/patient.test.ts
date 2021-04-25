import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
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

  test('should return patient info when patient is found', async () => {
    jest.spyOn(
      patientRepository, 'findPatient',
    ).mockImplementation(async () => patientFixture);
    const [result, error] = await wrapError(interactor.getPatientDetail(1));

    expect(error).toBe(null);
    expect(result).toEqual(patientFixture);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      patientRepository, 'findPatient',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.getPatientDetail(1));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

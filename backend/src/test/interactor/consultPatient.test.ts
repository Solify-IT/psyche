import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
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

describe('All patients', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  test('should return all Patients', async () => {
    jest.spyOn(
      patientRepository, 'findAll',
    );
    const [result, error] = await wrapError(interactor.getAll());

    expect(error).toBe(null);
    expect(result).toEqual(undefined);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      patientRepository, 'findAll',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.getAll());

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

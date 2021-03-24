import PatientInteractor from '../app/interactor/patientInteractor';
import MockPatientPresenter from './mocks/patientPresenterMock';
import MockPatientRepository from './mocks/patientRepositoryMock';

const patientsTotal = 5;

describe('Patients interactor gets all patients', () => {
  const mockRepository : MockPatientRepository = new MockPatientRepository();
  const mockPresenter : MockPatientPresenter = new MockPatientPresenter();

  const patientInteractor = new PatientInteractor(mockRepository, mockPresenter);

  it('should return list of patients', () => patientInteractor.getAll().then((data) => {
    expect(data.length).toBe(patientsTotal);
  }));
});

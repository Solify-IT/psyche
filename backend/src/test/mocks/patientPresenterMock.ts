import IPatientPresenter from 'app/presenter/patientPresenter';

export default class MockPatientPresenter implements IPatientPresenter {
  findAll(patients: any[]): any[] {
    return patients;
  }
}

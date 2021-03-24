import { IPatientPresenter } from 'app';

export default class MockPatientPresenter implements IPatientPresenter {
  findAll(patients: any[]): any[] {
    return patients;
  }
}

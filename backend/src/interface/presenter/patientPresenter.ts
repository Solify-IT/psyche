import { Patient } from 'domain/model';
import { IPatientPresenter } from 'app';

export default class PatientPresenter implements IPatientPresenter {
  findAll(patients: Patient[]): Patient[] {
    return patients;
  }
}

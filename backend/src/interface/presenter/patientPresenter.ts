import { Patient } from 'src/domain/model';
import { IPatientPresenter } from 'src/app';

export default class PatientPresenter implements IPatientPresenter {
  findAll(patients: Patient[]): Patient[] {
    return patients;
  }
}
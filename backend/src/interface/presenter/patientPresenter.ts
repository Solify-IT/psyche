import { Patient } from 'domain/model';
import IPatientPresenter from 'app/presenter/patientPresenter';

export default class PatientPresenter implements IPatientPresenter {
  patientDetail(patient: Patient): Patient {
    return patient;
  }

  findAll(patients: Patient[]): Patient[] {
    return patients;
  }
}

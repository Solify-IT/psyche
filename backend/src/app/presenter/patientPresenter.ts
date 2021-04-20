import { Patient } from 'domain/model';

export default interface IPatientPresenter {
  findAll(patients: Patient[]) : Patient[];
  patientDetail(patient: Patient) : Patient;
}

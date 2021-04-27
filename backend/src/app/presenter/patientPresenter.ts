import { Patient } from 'domain/model';
import Record from 'domain/model/record';

export default interface IPatientPresenter {
  findAll(patients: Patient[]) : Patient[];
  patientDetail(patient: Patient) : Patient;
  register(patient: Record): Record;
}

import { Patient } from 'domain/model';
import Record from 'domain/model/record';

export default interface IPatientPresenter {
  findAll(patients: Patient[]) : Patient[];
  record(record: Record) : Record;
  canalize(patient: Patient): Patient;
}

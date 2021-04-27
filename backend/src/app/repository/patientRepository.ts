import { Patient } from 'domain/model';
import Record from 'domain/model/record';

export default interface IPatientRepository {
  findAll(): Promise<Patient[]>;
  findPatient(id: number) : Promise<Patient>;
  register(patient: Patient[]): Promise<Record>;
}

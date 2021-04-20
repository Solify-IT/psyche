import { Patient } from 'domain/model';

export default interface IPatientRepository {
  findAll(): Promise<Patient[]>;
  findPatient(id: number) : Promise<Patient>;
}

import { Patient } from 'domain/model';

export interface IPatientRepository {
  findAll(): Promise<Patient[]>;
}

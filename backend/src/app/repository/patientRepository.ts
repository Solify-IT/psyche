import { Patient } from 'src/domain/model';

export interface IPatientRepository {
    findAll(): Promise<Patient[]>;
}
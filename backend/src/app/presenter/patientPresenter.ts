import { Patient } from 'domain/model';

export interface IPatientPresenter {
  findAll(patients: Patient[]) : Patient[];
}

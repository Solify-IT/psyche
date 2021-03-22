import { Patient } from 'src/domain/model';

export interface IPatientPresenter {
    findAll(patients: Patient[]) : Patient[];
}
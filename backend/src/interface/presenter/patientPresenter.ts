import { Patient } from 'domain/model';
import IPatientPresenter from 'app/presenter/patientPresenter';
import Record from 'domain/model/record';

export default class PatientPresenter implements IPatientPresenter {
  findAll(patients: Patient[]): Patient[] {
    return patients;
  }

  record(record: Record): Record {
    return record;
  }
}

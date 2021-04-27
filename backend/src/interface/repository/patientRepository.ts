import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
import Record from 'domain/model/record';
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async register(patients: Patient[]): Promise<Record> {
    const record = {
      patients,
    };

    const [result, error] = await wrapError(
      this.datastore.save<Record>('Record', record),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async findAll(): Promise<Patient[]> {
    const [patients, error] = await wrapError(
      this.datastore.fetchAll<Patient>('Patient'),
    );

    if (error) {
      throw error;
    }

    return patients;
  }
}

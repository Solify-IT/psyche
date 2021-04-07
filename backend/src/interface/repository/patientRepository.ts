import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async findAll(): Promise<Patient[]> {
    const [books, error] = await wrapError(
      this.datastore.fetchAll<Patient>('Patient'),
    );

    if (error) {
      throw error;
    }

    return books;
  }
}

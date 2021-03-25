import { wrapError } from '@types';
import Patient from 'domain/model';
import { IPatientRepository } from 'app';
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async findAll(): Promise<Patient[]> {
    const [books, error] = await wrapError(
      this.datastore.patients.query(),
    );

    if (error) {
      throw error;
    }

    return books;
  }
}

import { wrapError } from '@types';
import { Doctor } from 'domain/model';
import IDoctorRepository from 'app/repository/doctorRepository';
import IDatastore from './datastore';

export default class DoctorRepository implements IDoctorRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  findAllOld(): Promise<Doctor[]> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Doctor[]> {
    const [doctors, error] = await wrapError(
      this.datastore.fetchAll<Doctor>('Doctor'),
    );

    if (error) {
      throw error;
    }

    return doctors;
  }
}

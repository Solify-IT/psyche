import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async findPatient(id: number): Promise<Patient> {
    const [patient, error] = await wrapError(
      this.datastore.fetchOne<Patient>('Patient', { id }),
    );

    if (error) {
      throw error;
    }

    if (patient) {
      return patient;
    }
    throw new NotFoundError('No se encontro al paciente solicitado');
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

import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
<<<<<<< HEAD
import NotFoundError from 'utils/errors/NotFoundError';
=======
import Record from 'domain/model/record';
>>>>>>> feat/registerPatients
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> feat/registerPatients
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

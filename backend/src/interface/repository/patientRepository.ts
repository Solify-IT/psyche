import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import Record from 'domain/model/record';
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async canalize(patient: Patient[]): Promise<any> {
    const [result, error] = await wrapError(
      this.datastore.save<Patient[]>('Patient', patient),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async findRecord(id: number): Promise<Record> {
    const [record, error] = await wrapError(
      this.datastore.fetchOne<Record>('Record', { id }),
    );

    if (error) {
      throw error;
    }

    if (record) {
      return record;
    }
    throw new NotFoundError('No se encontró el expediente del paciente solicitado');
  }

  async register(patients: Patient[]): Promise<Record> {
    const updatedAt = new Date();
    const record = {
      patients,
      updatedAt,
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
      this.datastore.fetchAllWhere<Patient>('Patient', { relations: ['user'] }),
    );

    if (error) {
      throw error;
    }

    return patients;
  }

  async updateDateAt(id: number): Promise<Record> {
    const updatedAt = new Date();
    const [record, error] = await wrapError(
      this.findRecord(id),
    );

    if (error) {
      throw error;
    }

    const [records, errorRecords] = await wrapError(
      this.datastore.save<Record>('Record', { ...record, updatedAt }),
    );

    if (errorRecords) {
      throw error;
    }

    return records;
  }

  async archiveRecord(id: number): Promise<Record> {
    const active = false;
    const [record, recordError] = await wrapError(
      this.datastore.fetchOne<Record>('Record', { id }),
    );
    if (recordError) {
      throw recordError;
    }
    if (record) {
      const [records, error] = await wrapError(
        this.datastore.save<Record>('Record', { ...record, active }),
      );

      if (error) {
        throw (error);
      }
      return records;
    }

    throw new NotFoundError('El expediente no existe');
  }
}

import { Graph, GroupByAndCountBuilder, wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import Record from 'domain/model/record';
import dateFormat from 'utils/dateFormat';
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
      this.datastore.fetchAllWhere<Patient>('Patient', { relations: ['user'] }),
    );

    if (error) {
      throw error;
    }

    return patients;
  }

  async getAgeGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'birthDate',
      condition: `Patient.type = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
      isAge: true,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Edad',
      data,
    };
    return graph;
  }

  async getGenderGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'gender',
      condition: `Patient.type = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Genero',
      data,
    };
    return graph;
  }
}

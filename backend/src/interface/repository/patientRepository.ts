import { Graph, GroupByAndCountBuilder, wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import Record from 'domain/model/record';
import dateFormat from 'utils/dateFormat';
import { Between } from 'typeorm';
import IDatastore from './datastore';

export default class PatientRepository implements IPatientRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async canalize(patients: Patient[]): Promise<any> {
    const [result, error] = await wrapError(
      this.datastore.save('Patient', patients),
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
      this.datastore.fetchAll<Patient>('Patient'),
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

  async getAgeGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.birthDate',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
      isAge: true,
      sort: true,
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
      type: 'Bar',
      label: 'Edad',
      groupByInterval: true,
    };
    return graph;
  }

  async getGenderGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.gender',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Género',
      data,
      type: 'Pie',
    };
    return graph;
  }

  async getStatusGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.status',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Activo',
      data,
      type: 'Pie',
    };
    return graph;
  }

  // Legal Proceedings
  async getLegalProceedingsGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.legalProceeding',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Procedimiento legal',
      data,
      type: 'Pie',
    };
    return graph;
  }

  // Abuse Type
  async getAbuseTypeGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.abuseType',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Tipo',
      data,
      type: 'Pie',
    };
    return graph;
  }

  // abuseFirstTime
  async getAbuseFirstTimeGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.abuseFirstTime',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
      sort: true,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Edad en que apareció',
      data,
      type: 'Bar',
      label: 'Edad en que apareció',
      groupByInterval: true,
    };
    return graph;
  }

  // abuseAttemtps
  async getAbuseAttemptsGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.abuseAttempts',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Número de Intentos',
      data,
      type: 'Bar',
      label: 'Intentos',
    };
    return graph;
  }

  // abuseMotive
  async getAbuseMotiveGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph> {
    const builder : GroupByAndCountBuilder = {
      tableName: 'Patient',
      field: 'Patient.abuseMotive',
      condition: `Patient.motive = '${motive}' AND Patient.startDate BETWEEN '${dateFormat(startDate)}' AND '${dateFormat(endDate)}'`,
    };

    const [data, error] = await wrapError(
      this.datastore.groupByAndCount(builder),
    );

    if (error) {
      throw error;
    }
    const graph : Graph = {
      title: 'Medio',
      data,
      type: 'Pie',
    };
    return graph;
  }

  async getPatientsCountInRange(startDate: Date, endDate: Date) {
    const [count, error] = await wrapError(
      this.datastore.count('Patient', {
        where: {
          startDate: Between(startDate, endDate),
        },
      }),
    );
    if (error) {
      throw error;
    }
    return count;
  }
}

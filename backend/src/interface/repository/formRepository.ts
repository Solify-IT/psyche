/* eslint-disable no-param-reassign */
import { wrapError } from '@types';
import { Form } from 'domain/model';
import PatientFormField from 'domain/model/patientFormField';
import IFormRepository from 'app/repository/formRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import PatientForm from 'domain/model/patientForm';
import Record from 'domain/model/record';
import IDatastore from './datastore';

export default class FormRepository implements IFormRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async deleteFormWithId(id: number): Promise<boolean> {
    const [result, error] = await wrapError(
      this.datastore.delete<Form>('Form', id),
    );
    if (error) {
      throw error;
    }
    if (result) {
      return false;
    }
    return true;
  }

  async getForms(): Promise<Form[]> {
    const [forms, error] = await wrapError(
      this.datastore.fetchAll<Form>('Form'),
    );

    if (error) {
      throw error;
    }

    return forms;
  }

  async updatePatientForm(form: PatientForm): Promise<Form> {
    const [result, error] = await wrapError(
      this.datastore.save<PatientForm>('PatientForm', form),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async getFormsWithReportId(id: number): Promise<Form[]> {
    const [record, recordError] = await wrapError(this.datastore.fetchOne<Record>('Record', id));
    if (recordError) {
      throw recordError;
    }

    if (record) {
    // TODO: Find way to improve this
      const typeValue = record.patients[0].type;
      const [result, error] = await wrapError(this.datastore.fetchAllWhere<Form>('Form', { type: typeValue }));
      if (error) {
        throw error;
      }
      return result;
    }
    throw new NotFoundError('No se encontró el expediente');
  }

  async registerPatientForm(form: PatientForm): Promise<PatientForm> {
    // Remove id of form, fields and options if received

    delete form.id;
    form.fields.forEach((field) => {
      delete field.id;
      field.options.forEach((option) => {
        delete option.id;
      });
    });
    const [result, error] = await wrapError(
      this.datastore.save<PatientForm>('PatientForm', form),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async detail(id: number): Promise<Form> {
    const [result, error] = await wrapError(
      this.datastore.fetchOne<Form>('Form', {
        id,
      }),
    );

    if (error) {
      throw error;
    }
    if (result) {
      return result;
    }
    throw new NotFoundError('No se encontró el form');
  }

  async detailField(id: number): Promise<PatientFormField> {
    const [result, error] = await wrapError(
      this.datastore.fetchOne<PatientFormField>('PatientForm', {
        id,
      }),
    );

    if (error) {
      throw error;
    }
    if (result) {
      return result;
    }
    throw new NotFoundError('No se encontró el form');
  }

  async register(form: Form): Promise<Form> {
    const [result, error] = await wrapError(
      this.datastore.save<Form>('Form', form),
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

  async getFormId(id: number): Promise<PatientForm[]> {
    const [record, recordError] = await wrapError(this.datastore.fetchOne<Record>('Record', id));
    if (recordError) {
      throw recordError;
    }

    if (record) {
    // TODO: Find way to improve this
      const typeValue = record.patients[0].type;
      const [result, error] = await wrapError(this.datastore.fetchAllWhere<PatientForm>('PatientForm', { type: typeValue }));
      if (error) {
        throw error;
      }
      return result;
    }
    throw new NotFoundError('No se encontró el expediente');
  }
}

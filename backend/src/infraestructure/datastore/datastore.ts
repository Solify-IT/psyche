/* eslint-disable @typescript-eslint/no-unused-vars */
import { wrapError } from '@types';
import Patient from 'domain/model';
import { IDatastore } from 'interface/repository';
import { getConnection } from 'typeorm';

export default class Datastore implements IDatastore {
  patients: {
    getAll(queryText?: string): Promise<Patient[]>;
  };

  constructor() {
    const getAll = async (): Promise<Patient[]> => {
      const connection = await getConnection();
      const patientRepository = connection.manager.getRepository(Patient);

      const patients: Patient[] = await patientRepository.find();

      return patients;
    };

    this.patients = { getAll };
  }
}

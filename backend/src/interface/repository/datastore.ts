import Patient from 'domain/model';

export default interface IDatastore {
  patients: {
    getAll(queryText?: string): Promise<Patient[]>;
  }
}
